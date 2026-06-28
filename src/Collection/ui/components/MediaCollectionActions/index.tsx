import type { AddWatchlistInput } from '../../../core/types/Collection.types'
import { AddToListPopover } from '../AddToListPopover'
import { WatchlistToggle } from '../WatchlistToggle'

type Props = AddWatchlistInput & { variant?: 'card' | 'detail' }

export const MediaCollectionActions = ({ variant = 'card', ...input }: Props) => (
  <div className="flex items-center gap-1">
    <WatchlistToggle variant={variant} {...input} />
    <AddToListPopover {...input} />
  </div>
)