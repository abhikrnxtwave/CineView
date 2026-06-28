import { makeAutoObservable, runInAction } from 'mobx'
import {
  COLLECTION_STORAGE_KEY,
  COLLECTION_VERSION,
} from '../../../core/constants/Collection.constants'
import {
  addWatchlistInputSchema,
  collectionStorageSchema,
  createListInputSchema,
  renameListInputSchema,
  updateNoteInputSchema,
} from '../../../core/types/Collection.schema'
import type {
  AddWatchlistInput,
  CustomList,
  ListItem,
  ProgressStats,
  StatusCounts,
  WatchlistEntry,
  WatchlistStatus,
} from '../../../core/types/Collection.types'
import { getEpisodeKey } from '../../../core/utils/episodeKey.utils'
import { migrateLegacyWatchlist } from '../../../core/utils/migrateStorage.utils'
import { getMediaKey } from '../../../core/utils/mediaKey.utils'

export class CollectionStore {
  watchlist: WatchlistEntry[] = []
  lists: CustomList[] = []
  watchedEpisodes: Array<{
    showId: number
    seasonNumber: number
    episodeNumber: number
    watchedAt: string
  }> = []
  isHydrated = false

  constructor() {
    makeAutoObservable(this)
  }

  get totalCount(): number {
    return this.watchlist.length
  }

  get countByStatus(): StatusCounts {
    return {
      all: this.watchlist.length,
      want_to_watch: this.watchlist.filter((e) => e.status === 'want_to_watch').length,
      watching: this.watchlist.filter((e) => e.status === 'watching').length,
      completed: this.watchlist.filter((e) => e.status === 'completed').length,
    }
  }

  // ── Watchlist ──────────────────────────────────────────

  getWatchlistEntry(mediaType: MediaType, mediaId: number): WatchlistEntry | undefined {
    const key = getMediaKey(mediaType, mediaId)
    return this.watchlist.find((e) => getMediaKey(e.mediaType, e.mediaId) === key)
  }

  isInWatchlist(mediaType: MediaType, mediaId: number): boolean {
    return !!this.getWatchlistEntry(mediaType, mediaId)
  }

  addToWatchlist(input: AddWatchlistInput) {
    const validated = addWatchlistInputSchema.parse(input)
    const key = getMediaKey(validated.mediaType, validated.mediaId)
    if (this.watchlist.some((e) => getMediaKey(e.mediaType, e.mediaId) === key)) return

    const now = new Date().toISOString()
    const entry: WatchlistEntry = {
      id: crypto.randomUUID(),
      mediaType: validated.mediaType,
      mediaId: validated.mediaId,
      status: 'want_to_watch',
      note: '',
      snapshot: validated.snapshot,
      addedAt: now,
      updatedAt: now,
    }
    runInAction(() => {
      this.watchlist = [entry, ...this.watchlist]
    })
    this.persist()
  }

  removeFromWatchlist(id: string) {
    const entry = this.watchlist.find((e) => e.id === id)
    runInAction(() => {
      this.watchlist = this.watchlist.filter((e) => e.id !== id)
      if (entry?.mediaType === 'tv') {
        this.watchedEpisodes = this.watchedEpisodes.filter((ep) => ep.showId !== entry.mediaId)
      }
    })
    this.persist()
  }

  toggleWatchlist(input: AddWatchlistInput) {
    const existing = this.getWatchlistEntry(input.mediaType, input.mediaId)
    if (existing) this.removeFromWatchlist(existing.id)
    else this.addToWatchlist(input)
  }

  updateWatchlistStatus(id: string, status: WatchlistStatus) {
    const entry = this.watchlist.find((e) => e.id === id)
    if (!entry) return
    const updatedAt = new Date().toISOString()
    runInAction(() => {
      this.watchlist = this.watchlist.map((e) =>
        e.id === id ? { ...e, status, updatedAt } : e,
      )
    })
    this.persist()
  }
  
  updateWatchlistNote(id: string, note: string) {
    const validated = updateNoteInputSchema.parse({ id, note })
    const entry = this.watchlist.find((e) => e.id === validated.id)
    if (!entry) return
    const updatedAt = new Date().toISOString()
    runInAction(() => {
      this.watchlist = this.watchlist.map((e) =>
        e.id === validated.id ? { ...e, note: validated.note, updatedAt } : e,
      )
    })
    this.persist()
  }

  clearWatchlistNote(id: string) {
    this.updateWatchlistNote(id, '')
  }

  // ── Custom lists ─────────────────────────────────────

  getList(listId: string): CustomList | undefined {
    return this.lists.find((l) => l.id === listId)
  }

  isInList(listId: string, mediaType: MediaType, mediaId: number): boolean {
    const list = this.getList(listId)
    if (!list) return false
    const key = getMediaKey(mediaType, mediaId)
    return list.items.some((i) => getMediaKey(i.mediaType, i.mediaId) === key)
  }

  getListsContaining(mediaType: MediaType, mediaId: number): string[] {
    const key = getMediaKey(mediaType, mediaId)
    return this.lists
      .filter((l) => l.items.some((i) => getMediaKey(i.mediaType, i.mediaId) === key))
      .map((l) => l.id)
  }

  createList(name: string, description = '') {
    const validated = createListInputSchema.parse({ name, description })
    const now = new Date().toISOString()
    const list: CustomList = {
      id: crypto.randomUUID(),
      name: validated.name,
      description: validated.description,
      items: [],
      createdAt: now,
      updatedAt: now,
    }
    runInAction(() => {
      this.lists = [list, ...this.lists]
    })
    this.persist()
    return list.id
  }

  renameList(id: string, name: string) {
    const validated = renameListInputSchema.parse({ id, name })
    const list = this.getList(validated.id)
    if (!list) return
    runInAction(() => {
      list.name = validated.name
      list.updatedAt = new Date().toISOString()
    })
    this.persist()
  }

  deleteList(id: string) {
    runInAction(() => {
      this.lists = this.lists.filter((l) => l.id !== id)
    })
    this.persist()
  }

  addToList(listId: string, input: AddWatchlistInput) {
    const list = this.getList(listId)
    if (!list) return
    const validated = addWatchlistInputSchema.parse(input)
    const key = getMediaKey(validated.mediaType, validated.mediaId)
    if (list.items.some((i) => getMediaKey(i.mediaType, i.mediaId) === key)) return

    const item: ListItem = {
      id: crypto.randomUUID(),
      mediaType: validated.mediaType,
      mediaId: validated.mediaId,
      snapshot: validated.snapshot,
      addedAt: new Date().toISOString(),
    }
    runInAction(() => {
      list.items = [item, ...list.items]
      list.updatedAt = new Date().toISOString()
    })
    this.persist()
  }

  removeFromList(listId: string, itemId: string) {
    const list = this.getList(listId)
    if (!list) return
    runInAction(() => {
      list.items = list.items.filter((i) => i.id !== itemId)
      list.updatedAt = new Date().toISOString()
    })
    this.persist()
  }

  toggleListItem(listId: string, input: AddWatchlistInput) {
    const list = this.getList(listId)
    if (!list) return
    const key = getMediaKey(input.mediaType, input.mediaId)
    const existing = list.items.find((i) => getMediaKey(i.mediaType, i.mediaId) === key)
    if (existing) this.removeFromList(listId, existing.id)
    else this.addToList(listId, input)
  }

  // ── Episode progress ─────────────────────────────────

  isEpisodeWatched(showId: number, seasonNumber: number, episodeNumber: number): boolean {
    const key = getEpisodeKey(showId, seasonNumber, episodeNumber)
    return this.watchedEpisodes.some(
      (ep) => getEpisodeKey(ep.showId, ep.seasonNumber, ep.episodeNumber) === key,
    )
  }

  toggleEpisode(showId: number, seasonNumber: number, episodeNumber: number) {
    const key = getEpisodeKey(showId, seasonNumber, episodeNumber)
    const exists = this.watchedEpisodes.some(
      (ep) => getEpisodeKey(ep.showId, ep.seasonNumber, ep.episodeNumber) === key,
    )
    runInAction(() => {
      if (exists) {
        this.watchedEpisodes = this.watchedEpisodes.filter(
          (ep) => getEpisodeKey(ep.showId, ep.seasonNumber, ep.episodeNumber) !== key,
        )
      } else {
        this.watchedEpisodes.push({
          showId,
          seasonNumber,
          episodeNumber,
          watchedAt: new Date().toISOString(),
        })
      }
    })
    this.persist()
  }

  markSeason(showId: number, seasonNumber: number, episodeNumbers: number[]) {
    const now = new Date().toISOString()
    runInAction(() => {
      episodeNumbers.forEach((episodeNumber) => {
        const key = getEpisodeKey(showId, seasonNumber, episodeNumber)
        if (
          !this.watchedEpisodes.some(
            (ep) => getEpisodeKey(ep.showId, ep.seasonNumber, ep.episodeNumber) === key,
          )
        ) {
          this.watchedEpisodes.push({ showId, seasonNumber, episodeNumber, watchedAt: now })
        }
      })
    })
    this.persist()
  }

  unmarkSeason(showId: number, seasonNumber: number) {
    runInAction(() => {
      this.watchedEpisodes = this.watchedEpisodes.filter(
        (ep) => !(ep.showId === showId && ep.seasonNumber === seasonNumber),
      )
    })
    this.persist()
  }

  getSeasonProgress(showId: number, seasonNumber: number, total: number): ProgressStats {
    const watched = this.watchedEpisodes.filter(
      (ep) => ep.showId === showId && ep.seasonNumber === seasonNumber,
    ).length
    return {
      watched,
      total,
      percent: total > 0 ? Math.round((watched / total) * 100) : 0,
    }
  }

  getShowProgress(showId: number, totalEpisodes: number): ProgressStats {
    const watched = this.watchedEpisodes.filter((ep) => ep.showId === showId).length
    return {
      watched,
      total: totalEpisodes,
      percent: totalEpisodes > 0 ? Math.round((watched / totalEpisodes) * 100) : 0,
    }
  }

  // ── Persistence ──────────────────────────────────────

  hydrate() {
    try {
      const raw = localStorage.getItem(COLLECTION_STORAGE_KEY)
      if (!raw) {
        const migrated = migrateLegacyWatchlist()
        if (migrated) {
          this.applyStorage(migrated)
          this.persist()
        }
        return
      }
      const parsed = collectionStorageSchema.parse(JSON.parse(raw))
      this.applyStorage(parsed)
    } catch {
      runInAction(() => {
        this.watchlist = []
        this.lists = []
        this.watchedEpisodes = []
      })
      this.persist()
    } finally {
      runInAction(() => {
        this.isHydrated = true
      })
    }
  }

  private applyStorage(data: {
    watchlist: WatchlistEntry[]
    lists: CustomList[]
    watchedEpisodes: Array<{
      showId: number
      seasonNumber: number
      episodeNumber: number
      watchedAt: string
    }>
  }) {
    runInAction(() => {
      this.watchlist = data.watchlist
      this.lists = data.lists
      this.watchedEpisodes = data.watchedEpisodes
    })
  }

  private persist() {
    const data = collectionStorageSchema.parse({
      version: COLLECTION_VERSION,
      watchlist: this.watchlist,
      lists: this.lists,
      watchedEpisodes: this.watchedEpisodes,
    })
    localStorage.setItem(COLLECTION_STORAGE_KEY, JSON.stringify(data))
  }
}

type MediaType = 'movie' | 'tv'

export const collectionStore = new CollectionStore()