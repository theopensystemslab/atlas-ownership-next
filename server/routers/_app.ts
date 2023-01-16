import { procedure, router } from "../trpc"
import { sanityClient } from "@/lib/sanity.server"
import {
  entriesQuery,
  patternClassesQuery,
  patternInfoQuery,
  patternsQuery,
  patternsWithClassQuery,
} from "@/lib/queries"
import { Entry, Pattern, PatternClass } from "@/lib/types"
import { z } from "zod"

export const appRouter = router({
  entries: procedure.query(
    (): Promise<Entry[]> => sanityClient.fetch(entriesQuery)
  ),
  patterns: procedure.query(
    (): Promise<Pattern[]> => sanityClient.fetch(patternsQuery)
  ),
  patternClasses: procedure.query(
    (): Promise<PatternClass[]> => sanityClient.fetch(patternClassesQuery)
  ),
  patternsWithClass: procedure.query(
    (): Promise<Pattern[]> => sanityClient.fetch(patternsWithClassQuery)
  ),
  patternInfo: procedure
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
