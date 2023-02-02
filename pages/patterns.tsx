import { PatternsLayout } from "@/components/layout/PatternsLayout"
import { createProxySSGHelpers } from "@trpc/react-query/ssg"
import { GetStaticProps, InferGetStaticPropsType } from "next"
import Head from "next/head"
import SuperJSON from "superjson"
import NoopLayout from "../components/layout/NoopLayout"
import { Page, PatternClass, PatternInfo } from "../lib/types"
import { appRouter } from "../server/routers/_app"

export const getStaticProps: GetStaticProps<{
  patternClasses: PatternClass[]
  patternsPageData: Page
  patternInfoList: PatternInfo[]
}> = async (context) => {
  const ssg = await createProxySSGHelpers({
    router: appRouter,
    ctx: {},
    transformer: SuperJSON, // optional - adds superjson serialization
  })

  const patternClasses = await ssg.patternClasses.fetch()
  const patternsPageData = await ssg.page.fetch({ pageSlug: "patterns" })
  const patternInfoList = await ssg.patternInfoList.fetch()

  return {
    props: {
      patternClasses,
      patternsPageData,
      patternInfoList,
    },
  }
}

const PatternsPage = (
  props: InferGetStaticPropsType<typeof getStaticProps>
) => {
  const { patternClasses, patternsPageData, patternInfoList } = props
  return (
    <>
      <Head>
        <title>Explore the patterns - The Atlas of Ownership</title>
      </Head>
      <PatternsLayout
        patternClasses={patternClasses}
        patternsPageData={patternsPageData}
        patternInfoList={patternInfoList}
      />
    </>
  )
}

PatternsPage.getLayout = NoopLayout

export default PatternsPage
