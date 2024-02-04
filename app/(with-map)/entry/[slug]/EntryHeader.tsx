import { Tag } from "@/app/ui/Tag"
import { Entry } from "@/app/utils/sanity/types"
import { ArrowLeft, ArrowUpRight, Close } from "@carbon/icons-react"
import Link from "next/link"

const EntryHeader = (entry?: Entry) => (
  <div
    // TODO: The sanity image pipeline could get us an optimized image here
    // https://www.sanity.io/docs/presenting-images
    style={{ backgroundImage: `url(${entry?.mainImage?.file?.asset?.url})` }}
    className="h-80 p-8 pt-2 flex flex-col justify-between bg-center bg-cover"
  >
    <nav className="flex justify-between">
      <Link href="/" className="inline-flex items-center space-x-1">
        <ArrowLeft />
        <span>Back to map</span>
      </Link>
      <Link href="/">
        <Close size={32} className="cursor-pointer" />
      </Link>
    </nav>
    <div className="flex flex-row justify-between items-center">
      <h1 className="text-3xl sm:text-5xl w-2/3 sm:w-1/2">{entry?.name}</h1>
      <div className="flex flex-col items-end opacity-90 text-sm">
        <Tag className="bg-white">{entry?.type}</Tag>
        {entry?.mainImage?.source ? (
          entry.mainImage.credit ? (
            <div className="mt-3">
              <span className="font-bold mr-2">Image</span>
              <a
                href={entry.mainImage.source}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-1 underline"
              >
                <span>{entry.mainImage.credit}</span>

                <ArrowUpRight />
              </a>
            </div>
          ) : (
            <div className="mt-3">
              <a
                href={entry.mainImage.source}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-1 underline"
              >
                <span>{"Image source"}</span>

                <ArrowUpRight />
              </a>
            </div>
          )
        ) : null}
      </div>
    </div>
  </div>
)

export default EntryHeader
