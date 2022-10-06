import store from "./store"
import { trpc } from "./trpc"

export const entriesQuery = `*[_type == "entry"]`
export const entryBySlugQuery = `*[slug.current == $slug]`

export const useEntriesQuery = () =>
  trpc.entries.useQuery(undefined, {
    onSuccess: (entries) => {
      store.entries = entries
    },
  })
