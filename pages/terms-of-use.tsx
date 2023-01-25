import { pageComponents } from "@/lib/page"
import { trpc } from "@/lib/trpc"
import { PortableText } from "@portabletext/react"
import NoopLayout from "../components/layout/NoopLayout"

const TermsOfUsePage = () => {
  const { data: page } = trpc.page.useQuery({ pageSlug: "terms-of-use" })

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

TermsOfUsePage.getLayout = NoopLayout

export default TermsOfUsePage
