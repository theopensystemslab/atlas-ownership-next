import { trpc } from "@/lib/trpc"
import NoopLayout from "../components/layout/NoopLayout"
import { ContentPage } from "@/components/ContentPage"

const LicencePage = () => {
  const { data: licensePage } = trpc.page.useQuery({ pageSlug: "licence"})

  return (
    <ContentPage page={licensePage} />
  )
}

LicencePage.getLayout = NoopLayout

export default LicencePage
