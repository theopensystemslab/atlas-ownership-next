import { ContentPage } from "@/components/ContentPage"
import { trpc } from "@/lib/trpc"
import NoopLayout from "../components/layout/NoopLayout"

const TermsOfUsePage = () => {
  const { data: termsOfUsePage } = trpc.page.useQuery({ pageSlug: "terms-of-use" })
  console.log(termsOfUsePage)

  return (
    <ContentPage page={termsOfUsePage} />
  )
}

TermsOfUsePage.getLayout = NoopLayout

export default TermsOfUsePage
