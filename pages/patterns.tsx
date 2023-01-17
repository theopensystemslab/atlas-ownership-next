import { trpc } from "../lib/trpc"
import { PatternsLayout } from "@/components/layout/PatternsLayout"
import { ReactElement } from "react"

const PatternsPage = () => {
  const { data: patternClasses, error: patternClassesError } =
    trpc.patternClasses.useQuery()

  return <PatternsLayout patternClasses={patternClasses} />
}

PatternsPage.getLayout = (page: ReactElement) => page

export default PatternsPage
