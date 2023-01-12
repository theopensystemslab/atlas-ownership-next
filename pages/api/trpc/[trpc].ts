import { initTRPC } from "@trpc/server"
import * as trpcNext from "@trpc/server/adapters/next"
import { z } from "zod"
import {
  entriesQuery,
  patternClassesQuery,
  patternInfoQuery,
  patternsQuery,
  patternsWithClassQuery,
} from "../../../lib/queries"
import { sanityClient } from "../../../lib/sanity.server"
import { Entry, Pattern, PatternClass } from "../../../lib/types"

export const t = initTRPC.create()

export const appRouter = t.router({
  entries: t.procedure.query(
    (): Promise<Entry[]> => sanityClient.fetch(entriesQuery)
  ),
  patterns: t.procedure.query(
    (): Promise<Pattern[]> => sanityClient.fetch(patternsQuery)
  ),
  patternClasses: t.procedure.query(
    (): Promise<PatternClass[]> => sanityClient.fetch(patternClassesQuery)
  ),
  patternsWithClass: t.procedure.query(
    (): Promise<Pattern[]> => sanityClient.fetch(patternsWithClassQuery)
  ),
  patternInfo: t.procedure
    .input(
      z.object({
        patternClassName: z.string().nullable(),
      })
    )
    .query(
      ({ input }): Promise<Record<"rights" | "obligations", Pattern[]>> =>
        sanityClient.fetch(patternInfoQuery(input?.patternClassName))
    ),
})

// export type definition of API
export type AppRouter = typeof appRouter

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => ({}),
})
