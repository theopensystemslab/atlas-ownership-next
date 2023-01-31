import { PatternsLayout } from "@/components/layout/PatternsLayout"
import Head from "next/head"
import NoopLayout from "../components/layout/NoopLayout"
import { trpc } from "../lib/trpc"

const PatternsPage = () => {
  const { data: patternClasses, error: patternClassesError } =
    trpc.patternClasses.useQuery()

  return (
    <>
      <Head>
        <title>Explore the patterns - The Atlas of Ownership</title>
      </Head>
      <PatternsLayout patternClasses={patternClasses} />
    </>
  )
}

PatternsPage.getLayout = NoopLayout

export default PatternsPage
