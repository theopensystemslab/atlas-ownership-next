import { CarouselItem, Page } from './../../lib/types';
import { procedure, router } from "../trpc"
import { sanityClient } from "@/lib/sanity.server"
import {
  entriesQuery,
  entriesByPatternIdQuery,
  patternClassesQuery,
  patternInfoQuery,
  patternsQuery,
  patternsWithClassQuery,
  tenureTypeQuery,
  contributorsQuery,
  pageQuery,
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
  tenureType: procedure
    .input(
      z.object({
        tenureTypes: z.array(z.string()).optional(),
        id: z.string().optional(),
      })
    )
    .query(
      ({ input }): Promise<CarouselItem[]> => 
        sanityClient.fetch(tenureTypeQuery(input.tenureTypes, input.id))
    ),
  entriesByPatternId: procedure
    .input(
      z.object({
        patternId: z.string().optional(),
        entryId: z.string().optional(),
      })
    )
    .query(
      ({ input }): Promise<CarouselItem[]> =>
        sanityClient.fetch(entriesByPatternIdQuery(input.patternId, input.entryId))
    ),
  contributors: procedure.query(
    (): Promise<string[]> => sanityClient.fetch(contributorsQuery)
  ),
  page: procedure
    .input(
      z.object({
        pageSlug: z.string().optional(),
      })
    )
    .query(
      ({ input }): Promise<Page> =>
        sanityClient.fetch(pageQuery(input?.pageSlug))
    ),
})

// export type definition of API
export type AppRouter = typeof appRouter
