import { ContentPage } from "@/app/ui/ContentPage"
import { getPage } from "@/app/utils/sanity/queries"
import { Metadata } from "next"

const TermsOfUsePage = async () => {
  const termsOfUsePage = await getPage("terms-of-use")

  return <ContentPage page={termsOfUsePage} />
}

export async function generateMetadata(): Promise<Metadata> {
  // fetch data
  const termsOfUse = await getPage("terms-of-use")

  return {
    title: termsOfUse.title,
    // openGraph: {
    //   images: ['/some-specific-page-image.jpg', ...previousImages],
    // },
  }
}
export default TermsOfUsePage
