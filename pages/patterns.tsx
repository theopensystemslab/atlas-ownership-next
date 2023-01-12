import { useRouter } from "next/router"
import { trpc } from "../lib/trpc"
import { PatternsLayout } from "@/components/layout/PatternsLayout"

const EntryPage = () => {
  const router = useRouter()

  const { data: patterns, error: patternsError } = trpc.patterns.useQuery()
  const { data: patternClasses, error: patternClaassesError } =
    trpc.patternClasses.useQuery()

  return <PatternsLayout patterns={patterns} patternClasses={patternClasses}/>
}

export default EntryPage
