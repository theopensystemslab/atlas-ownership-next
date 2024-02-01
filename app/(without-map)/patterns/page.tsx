import {
  getPage,
  getPatternClasses,
  getPatternInfo,
} from "@/app/utils/sanity/queries"
import { Metadata } from "next"
import PatternsImpl from "./PatternsImpl"

const PatternsPage = async () => {
  const patternClasses = await getPatternClasses()
  const patternsPageData = await getPage("patterns")
  const patternInfoList = await getPatternInfo()

  return (
    <PatternsImpl
      patternClasses={patternClasses}
      patternsPageData={patternsPageData}
      patternInfoList={patternInfoList}
    />
  )
}

export const metadata: Metadata = {
  title: "Explore the patterns - The Atlas of Ownership",
}

export default PatternsPage
