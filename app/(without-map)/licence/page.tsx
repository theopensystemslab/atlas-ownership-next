import { ContentPage } from "@/app/ui/ContentPage"
import { getPage } from "@/app/utils/sanity/queries"

const LicencePage = async () => {
  const licencePage = await getPage("licence")

  return <ContentPage page={licencePage} />
}

export default LicencePage
