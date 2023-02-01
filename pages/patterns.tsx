import { PatternsLayout } from "@/components/layout/PatternsLayout"
import { createProxySSGHelpers } from "@trpc/react-query/ssg"
import { GetStaticProps, InferGetStaticPropsType } from "next"
import Head from "next/head"
import SuperJSON from "superjson"
import NoopLayout from "../components/layout/NoopLayout"
import { Page, PatternClass } from "../lib/types"
import { appRouter } from "../server/routers/_app"

export const getStaticProps: GetStaticProps<{
  patternClasses: PatternClass[]
  patternsPageData: Page
}> = async (context) => {
  const ssg = await createProxySSGHelpers({
    router: appRouter,
    ctx: {},
    transformer: SuperJSON, // optional - adds superjson serialization
  })

  const patternClasses = await ssg.patternClasses.fetch()
  const patternsPageData = await ssg.page.fetch({ pageSlug: "patterns" })

  return {
    props: {
      patternClasses,
      patternsPageData,
    },
  }
}

const PatternsPage = (
  props: InferGetStaticPropsType<typeof getStaticProps>
) => {
  const { patternClasses, patternsPageData } = props
  return (
    <>
      <Head>
        <title>Explore the patterns - The Atlas of Ownership</title>
      </Head>
      <PatternsLayout
        patternClasses={patternClasses}
        patternsPageData={patternsPageData}
      />
    </>
  )
}

PatternsPage.getLayout = NoopLayout

export default PatternsPage
