import { PatternsLayout } from "@/components/layout/PatternsLayout"
import NoopLayout from "../components/layout/NoopLayout"
import { trpc } from "../lib/trpc"

const PatternsPage = () => {
  const { data: patternClasses, error: patternClassesError } =
    trpc.patternClasses.useQuery()

  return <PatternsLayout patternClasses={patternClasses} />
}

PatternsPage.getLayout = NoopLayout

export default PatternsPage
