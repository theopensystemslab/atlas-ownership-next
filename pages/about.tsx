import { pageComponents } from "@/lib/page"
import { trpc } from "@/lib/trpc"
import { PortableText } from "@portabletext/react"
import Image from "next/image"
import NoopLayout from "../components/layout/NoopLayout"

const AboutPage = () => {
  const { data: page } = trpc.page.useQuery({ pageSlug: "about" })

  return (
    <div className="flex">
      <div className="w-1/3">
        <h1 className="text-5xl font-semibold mb-12">
          { page?.title }
        </h1>
        <div className="flex flex-col w-3/4">
          <PortableText
            value={page?.content}
            components={pageComponents}
          />
        </div>
      </div>
      <div className="w-2/3 relative flex items-center justify-center">
        <Image
          src="/images/real-estate-value-diagram-reverse.svg"
          alt="Real estate value comparison diagram"
          layout="fill" // parent must have position set
          style={{ WebkitFilter: "invert(100%)", filter: "invert(100%)" }}
        />
      </div>
    </div>
  )
}

AboutPage.getLayout = NoopLayout

export default AboutPage
