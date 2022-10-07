import { initTRPC } from "@trpc/server"
import * as trpcNext from "@trpc/server/adapters/next"
import { entriesQuery } from "../../../lib/queries"
import { sanityClient } from "../../../lib/sanity.server"
import { Entry } from "../../../lib/types"

export const t = initTRPC.create()

export const appRouter = t.router({
  entries: t.procedure.query(
    (): Promise<Entry[]> => sanityClient.fetch(entriesQuery)
  ),
})

// export type definition of API
export type AppRouter = typeof appRouter

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => ({}),
})
