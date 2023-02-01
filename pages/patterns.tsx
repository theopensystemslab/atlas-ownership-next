import { PatternsLayout } from "@/components/layout/PatternsLayout"
import { createProxySSGHelpers } from "@trpc/react-query/ssg"
import { GetStaticProps, InferGetStaticPropsType } from "next"
import Head from "next/head"
import SuperJSON from "superjson"
import NoopLayout from "../components/layout/NoopLayout"
import { appRouter } from "../server/routers/_app"

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = await createProxySSGHelpers({
    router: appRouter,
    ctx: {},
    transformer: SuperJSON, // optional - adds superjson serialization
  })
  const patternClasses = await ssg.patternClasses.fetch()

  return {
    props: {
      patternClasses,
    },
  }
}

const PatternsPage = ({
  patternClasses,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
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
