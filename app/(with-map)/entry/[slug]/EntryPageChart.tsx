import { A } from "@/app/utils/fp"
import {
  getPatternClasses,
  getPatterns,
  getRelatedEntriesByPattern,
  getRelatedEntriesByTenureQuery,
} from "@/app/utils/sanity/queries"
import { Entry, Term } from "@/app/utils/sanity/types"
import { pipe } from "fp-ts/lib/function"
import _ from "lodash"
import EntryPageChartImpl from "./EntryPageChartImpl"

type Props = {
  entry: Entry
}

const EntryPageChart = async (props: Props) => {
  const { entry } = props

  const terms: Term[] = entry.terms ?? []

  const patterns = await getPatterns()
  const patternClasses = await getPatternClasses()

  const relatedEntriesByTenure = await getRelatedEntriesByTenureQuery(
    entry.tenureType,
    entry._id
  )

  const augmentedTerms = await Promise.all(
    pipe(
      terms,
      A.map(async (term) => {
        const patternId = term.pattern._ref
        const entryId = entry._id

        const relatedEntriesByPattern = await getRelatedEntriesByPattern(
          patternId,
          entryId
        )

        const pattern = _.find(patterns, ["_id", term.pattern?._ref])

        const patternName = _.find(patterns, ["_id", term.pattern?._ref])?.name

        const type = _.capitalize(
          _.find(patterns, ["_id", term.pattern?._ref])?.type
        )

        // strength: term.strength, // 1-5
        // description: term.description,
        const legalMechanisms = term.termLegalMechanisms?.map(
          (mechanism: Record<string, any>): string => mechanism.name
        )

        return {
          meta: pattern,
          name: patternName,
          patternClassName: _.find(patternClasses, [
            "_id",
            pattern?.class?._ref,
          ])?.name,
          patternClassOrder: _.find(patternClasses, [
            "_id",
            pattern?.class?._ref,
          ])?.order,
          patternIconUrl: pattern?.iconUrl,
          type: type === "Limitation" ? "Obligation" : type,
          strength: term.strength,
          description: term.description,
          legalMechanisms,
          relatedEntriesByPattern,
        }
      })
    )
  )

  // Format the list of individual terms that apply to this entry
  // let formattedTerms = _(entry.terms)
  //   .map((term: any) => ({
  //     pattern: _.find(patterns, ["_id", term.pattern?._ref]),
  //     patternName: _.find(patterns, ["_id", term.pattern?._ref])?.name,
  //     type: _.capitalize(_.find(patterns, ["_id", term.pattern?._ref])?.type),
  //     strength: term.strength, // 1-5
  //     description: term.description,
  //     legalMechanisms: term.termLegalMechanisms?.map(
  //       (mechanism: Record<string, any>) => mechanism.name
  //     ),
  //   }))
  //   .map((term: any) => ({
  //     meta: term.pattern,
  //     name: term.patternName,
  //     patternClassName: _.find(patternClasses, [
  //       "_id",
  //       term.pattern?.class?._ref,
  //     ])?.name,
  //     patternClassOrder: _.find(patternClasses, [
  //       "_id",
  //       term.pattern?.class?._ref,
  //     ])?.order,
  //     patternIconUrl: term.pattern?.iconUrl,
  //     type: term.type === "Limitation" ? "Obligation" : term.type,
  //     strength: term.strength,
  //     description: term.description,
  //     legalMechanisms: term.legalMechanisms,
  //   }))
  //   .sortBy("patternClassOrder", "name")
  //   .value()

  return <EntryPageChartImpl augmentedTerms={augmentedTerms} />
}

export default EntryPageChart
