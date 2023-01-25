import { trpc } from "@/lib/trpc"
import NoopLayout from "../components/layout/NoopLayout"
import { PortableText } from '@portabletext/react'
import { pageComponents } from "../lib/page"

const LicencePage = () => {
  const { data: page } = trpc.page.useQuery({ pageSlug: "licence"})

  return (
    <div className="w-1/3">
      <h1 className="text-5xl font-semibold mb-12">
        { page?.title }
      </h1>
      <div className="flex flex-col">
        <PortableText
          value={page?.content}
          components={pageComponents}
        />
      </div>
    </div>
  )
}

LicencePage.getLayout = NoopLayout

export default LicencePage
