import { Metadata } from "next"
import { ContentPage } from "../../ui/ContentPage"
import { getPage } from "../../utils/sanity/queries"

const AccessibilityPage = async () => {
  const accessibilityPage = await getPage("accessibility")
  return <ContentPage page={accessibilityPage} />
}

export async function generateMetadata(): Promise<Metadata> {
  // fetch data
  const accessibilityPage = await getPage("accessibility")

  return {
    title: accessibilityPage.title,
    // openGraph: {
    //   images: ['/some-specific-page-image.jpg', ...previousImages],
    // },
  }
}

export default AccessibilityPage
