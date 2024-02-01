import { Tag } from "@/app/ui/Tag"
import { Entry } from "@/app/utils/sanity/types"
import { Close } from "@carbon/icons-react"
import Link from "next/link"

const EntryHeader = (entry?: Entry) => (
  <div
    // TODO: The sanity image pipeline could get us an optimized image here
    // https://www.sanity.io/docs/presenting-images
    style={{ backgroundImage: `url(${entry?.mainImage?.file?.asset?.url})` }}
    className="h-80 p-8 pt-2 flex flex-col justify-between bg-center bg-cover"
  >
    <nav className="flex justify-between">
      <Link href="/">Back to map</Link>
      <Link href="/">
        <Close size={32} className="cursor-pointer" />
      </Link>
    </nav>
    <div className="flex flex-row justify-between items-center">
      <h1 className="text-3xl sm:text-5xl w-2/3 sm:w-1/2">{entry?.name}</h1>
      <Tag className="bg-white">{entry?.type}</Tag>
    </div>
  </div>
)

export default EntryHeader
