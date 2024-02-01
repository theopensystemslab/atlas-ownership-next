import {
  getPatternClasses,
  getPatternsWithClass,
} from "@/app/utils/sanity/queries"
import SidebarClientComponent from "./SidebarClientComponent"

const Sidebar = async () => {
  const patterns = await getPatternsWithClass()
  const patternClasses = await getPatternClasses()

  return (
    <SidebarClientComponent
      patterns={patterns}
      patternClasses={patternClasses}
    />
  )
}

export default Sidebar
