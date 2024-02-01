import { Carousel } from "@/app/ui/carousel/Carousel"
import { getFormattedTenureTypes } from "@/app/utils/sanity/entry"
import {
  getEntry,
  getRelatedEntriesByTenureQuery,
} from "@/app/utils/sanity/queries"
import { ArrowRight } from "@carbon/icons-react"
import { Metadata, ResolvingMetadata } from "next"
import EntryDetails from "./EntryDetails"
import EntryHeader from "./EntryHeader"
import EntryPageChart from "./EntryPageChart"

type Props = {
  params: { slug: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug

  // fetch data
  const entry = await getEntry(slug)

  const { name: title, mainImage } = entry

  return {
    title,
    openGraph: {
      images: [
        {
          url: mainImage?.file?.asset?.url ?? "",
          alt: title,
        },
      ],
    },
  }
}

const EntryPage = async ({ params: { slug } }: Props) => {
  const entry = await getEntry(slug)
  const relatedEntriesByTenure = await getRelatedEntriesByTenureQuery(
    entry.tenureType,
    entry._id
  )

  return (
    <div className="text-white">
      <EntryHeader {...entry} />
      <EntryDetails {...entry} />
      <EntryPageChart entry={entry} />
      {entry.tenureType && (
        <div className="m-4">
          <Carousel
            data={relatedEntriesByTenure}
            title={`Other examples of ${getFormattedTenureTypes(
              entry?.tenureType
            )}`}
            cardClassNames="bg-gray-200"
          />
        </div>
      )}
      <a
        className="w-full bg-black flex py-4 justify-center"
        href="https://airtable.com/shrl7X5UhiOHUaj3r"
        target="_blank"
        rel="noreferrer"
      >
        Suggest an improvement to this entry
        <ArrowRight className="pl-2" size={24} />
      </a>
    </div>
  )
}

export default EntryPage
