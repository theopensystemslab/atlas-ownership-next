import { ContentPage } from "@/components/ContentPage"
import { trpc } from "@/lib/trpc"
import Image from "next/image"
import NoopLayout from "../components/layout/NoopLayout"

const AboutPage = () => {
  const { data: aboutPage } = trpc.page.useQuery({ pageSlug: "about" })

  return (
    <div className="flex">
      <ContentPage page={aboutPage} />
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
