import { ContentPage } from "@/app/ui/ContentPage"
import { getPage } from "@/app/utils/sanity/queries"
import Image from "next/image"

const AboutPage = async () => {
  const aboutPage = await getPage("about")

  return (
    <div className="flex flex-col sm:flex-row">
      <ContentPage page={aboutPage} title="About" />
      <div className="w-full sm:w-2/3 relative sm:flex sm:items-center sm:justify-center h-80 sm:h-auto my-0">
        <Image
          src="/images/real-estate-value-diagram-reverse.svg"
          alt="Real estate value comparison diagram"
          fill // parent must have position set
          priority
          style={{ WebkitFilter: "invert(100%)", filter: "invert(100%)" }}
        />
      </div>
    </div>
  )
}

export default AboutPage
