import { ContentPage } from "@/components/ContentPage"
import { trpc } from "@/lib/trpc"
import Image from "next/future/image"
import NoopLayout from "../components/layout/NoopLayout"

const AboutPage = () => {
  const { data: aboutPage } = trpc.page.useQuery({ pageSlug: "about" })

  return (
    <div className="flex flex-col sm:flex-row">
      <ContentPage page={aboutPage} />
      <div className="w-full sm:w-2/3 relative sm:flex sm:items-center sm:justify-center">
        <Image
          src="/images/real-estate-value-diagram-reverse.svg"
          alt="Real estate value comparison diagram"
          fill // parent must have position set
          style={{ WebkitFilter: "invert(100%)", filter: "invert(100%)" }}
        />
      </div>
    </div>
  )
}

AboutPage.getLayout = NoopLayout

export default AboutPage
