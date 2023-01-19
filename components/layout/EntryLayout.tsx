import { getFormattedEntryDates, getFormattedTenureTypes } from "@/lib/entry"
import { ArrowRight, ArrowUpRight, Close } from "@carbon/icons-react"
import Link from "next/link"
import { Fragment } from "react"
import { CarouselItem, Entry, Pattern, PatternClass } from "../../lib/types"
import Back from "../Back"
import { Carousel } from "../carousel/Carousel"
import Chart from "../Chart"
import { Tag } from "./ui/Tag"

interface EntryLayoutProps {
  entry?: Entry
  patterns?: Pattern[]
  patternClasses?: PatternClass[]
  carouselItems?: CarouselItem[]
}

interface EntryItemProps {
  heading: string
  className?: string
  children?: React.ReactNode
}

const EntryHeader = (entry?: Entry) => (
  <div
    // TODO: The sanity image pipeline could get us an optimized image here
    // https://www.sanity.io/docs/presenting-images
    style={{ backgroundImage: `url(${entry?.mainImage?.file?.asset?.url})` }}
    className="h-80 p-4 pt-2 flex flex-col justify-between bg-center bg-cover"
  >
    <nav className="flex justify-between">
      <Back>
        <Link href="/">Back to map</Link>
      </Back>
      <Back>
        <a>
          <Close size={32} className="cursor-pointer" />
        </a>
      </Back>
    </nav>
    <div className="flex flex-row justify-between items-center">
      <h1 className="text-5xl w-1/2">{entry?.name}</h1>
      <Tag>{entry?.type}</Tag>
    </div>
  </div>
)

const EntryItem = ({ heading, className, children }: EntryItemProps) => (
  <section className={className}>
    <div
      role="doc-subtitle"
      className={`mb-1 ${children ? "text-sm" : "text-2xl"}`}
    >
      {heading}
    </div>
    {children}
  </section>
)

const References = (entry?: Entry) => (
  <>
    {entry?.references?.map((reference) => (
      <a
        key={reference._key}
        href={reference.link}
        className="text-sm text-gray-400 underline block"
      >
        {reference.name} <ArrowUpRight className="ml-1 inline-flex" />
      </a>
    ))}
  </>
)

const EntryDetails = (entry?: Entry) => (
  <div className="bg-white text-black grid grid-cols-4 grid-rows-auto gap-x-4 gap-y-6 p-4">
    <EntryItem
      className="col-span-2"
      heading={getFormattedTenureTypes(entry?.tenureType)}
    />
    <EntryItem heading={entry?.location?.region || "Unknown location"} />
    <EntryItem heading={getFormattedEntryDates(entry?.dates)} />
    <EntryItem heading="" className="col-span-4">
      <p className="text-sm mb-2 whitespace-pre-wrap">{entry?.description}</p>
    </EntryItem>
    {entry?.references?.length && (
      <EntryItem heading="More information" className="col-span-2">
        <References {...entry} />
      </EntryItem>
    )}
    <EntryItem heading="Rating" className="col-span-2">
      <>
        <p>
          This entry is{" "}
          <span className="text-gray-400 lowercase">
            {entry?.entryRating?.grade || "a draft"}
          </span>
        </p>
        <div className="">
          {entry?.tags &&
            entry.tags.map((entryTag) => (
              <Tag key={entryTag.value} className={"bg-gray-200 mt-2"}>
                {entryTag.label}
              </Tag>
            ))}
        </div>
      </>
    </EntryItem>
  </div>
)

export const EntryLayout = (props: EntryLayoutProps) => {
  const { entry, carouselItems } = props
  return (
    <div className="text-white">
      <EntryHeader {...entry} />
      <EntryDetails {...entry} />
      <Chart
        rollupToPatternClass={false}
        showLabels={true}
        terms={entry?.terms}
        entryId={entry?._id}
      />
      {entry?.tenureType && (
        <Carousel
          data={carouselItems}
          title={`Other examples of ${getFormattedTenureTypes(
            entry?.tenureType
          )}`}
          cardClassNames="bg-gray-200"
        />
      )}
      <a className="w-full bg-black flex py-4 justify-center" href="#">
        Suggest an improvement to this entry
        <ArrowRight className="pl-2" size={24} />
      </a>
    </div>
  )
}
