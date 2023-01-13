import { trpc } from "../lib/trpc"
import { PatternsLayout } from "@/components/layout/PatternsLayout"

const EntryPage = () => {
  const { data: patternClasses, error: patternClassesError } =
    trpc.patternClasses.useQuery()

  return <PatternsLayout patternClasses={patternClasses}/>
}

export default EntryPage
