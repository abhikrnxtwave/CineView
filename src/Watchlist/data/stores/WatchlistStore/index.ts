import { makeAutoObservable, runInAction } from 'mobx'
import { WATCHLIST_STORAGE_KEY } from '../../../core/constants/Watchlist.constants'
import {
  addWatchlistInputSchema,
  updateNoteInputSchema,
  watchlistStorageSchema,
} from '../../../core/types/Watchlist.schema'
import type {
  AddWatchlistInput,
  StatusCounts,
  WatchlistEntry,
  WatchlistStatus,
} from '../../../core/types/Watchlist.types'
import { getMediaKey } from '../../../core/utils/mediaKey.utils'

export class WatchlistStore {
  entries: WatchlistEntry[] = []
  isHydrated = false

  constructor() {
    makeAutoObservable(this)
  }

  get totalCount(): number {
    return this.entries.length
  }

  get countByStatus(): StatusCounts {
    return {
      all: this.entries.length,
      want_to_watch: this.entries.filter((e) => e.status === 'want_to_watch').length,
      watching: this.entries.filter((e) => e.status === 'watching').length,
      completed: this.entries.filter((e) => e.status === 'completed').length,
    }
  }

  getEntry(mediaType: WatchlistEntry['mediaType'], mediaId: number): WatchlistEntry | undefined {
    const key = getMediaKey(mediaType, mediaId)
    return this.entries.find((e) => getMediaKey(e.mediaType, e.mediaId) === key)
  }

  isInWatchlist(mediaType: WatchlistEntry['mediaType'], mediaId: number): boolean {
    return !!this.getEntry(mediaType, mediaId)
  }

  hydrate() {
    try {
      const raw = localStorage.getItem(WATCHLIST_STORAGE_KEY)
      if (!raw) {
        runInAction(() => {
          this.entries = []
        })
        return
      }

      const parsed = watchlistStorageSchema.parse(JSON.parse(raw))
      runInAction(() => {
        this.entries = parsed.entries
      })
    } catch {
      runInAction(() => {
        this.entries = []
      })
      this.persist()
    } finally {
      runInAction(() => {
        this.isHydrated = true
      })
    }
  }

  add(input: AddWatchlistInput) {
    const validated = addWatchlistInputSchema.parse(input)
    const key = getMediaKey(validated.mediaType, validated.mediaId)

    if (this.entries.some((e) => getMediaKey(e.mediaType, e.mediaId) === key)) {
      return
    }

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
      this.entries = [entry, ...this.entries]
    })
    this.persist()
  }

  remove(id: string) {
    runInAction(() => {
      this.entries = this.entries.filter((e) => e.id !== id)
    })
    this.persist()
  }

  toggle(input: AddWatchlistInput) {
    const existing = this.getEntry(input.mediaType, input.mediaId)
    if (existing) {
      this.remove(existing.id)
    } else {
      this.add(input)
    }
  }

  updateStatus(id: string, status: WatchlistStatus) {
    const entry = this.entries.find((e) => e.id === id)
    if (!entry) return

    runInAction(() => {
      entry.status = status
      entry.updatedAt = new Date().toISOString()
    })
    this.persist()
  }

  updateNote(id: string, note: string) {
    const validated = updateNoteInputSchema.parse({ id, note })
    const entry = this.entries.find((e) => e.id === validated.id)
    if (!entry) return

    runInAction(() => {
      entry.note = validated.note
      entry.updatedAt = new Date().toISOString()
    })
    this.persist()
  }

  private persist() {
    const data = watchlistStorageSchema.parse({ entries: this.entries })
    localStorage.setItem(WATCHLIST_STORAGE_KEY, JSON.stringify(data))
  }
}

export const watchlistStore = new WatchlistStore()