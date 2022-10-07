import store from "./store"
import { trpc } from "./trpc"

export const entriesQuery = `*[_type == "entry"]`
export const entryBySlugQuery = `*[slug.current == $slug]`
export const patternsQuery = `*[_type == "pattern"]`
export const patternClassesQuery = `*[_type == "patternClass"] | order(order)`

export const useEntriesQuery = () =>
  trpc.entries.useQuery(undefined, {
    onSuccess: (entries) => {
      store.entries = entries
    },
  })

export const usePatternsQuery = () => 
  trpc.patterns.useQuery(undefined, {
    onSuccess: (patterns) => {
      store.patterns = patterns
    },
  })

export const usePatternClassesQuery = () => 
  trpc.patternClasses.useQuery(undefined, {
    onSuccess: (patternClasses) => {
      store.patternClasses = patternClasses
    },
  })