import { getFormattedEntryDates, getFormattedTenureTypes } from "@/lib/entry"
import { trpc } from "@/lib/trpc"
import { ArrowUpRight, Close } from "@carbon/icons-react"
import Link from "next/link"
import { CarouselItem, Entry, Pattern, PatternClass, TenureType } from "../../lib/types"
import Back from "../Back"
import { Carousel } from "../carousel/Carousel"
import Chart from "../Chart"
import { Tag } from "./ui/Tag"

interface EntryLayoutProps {
  entry?: Entry
  patterns?:  Pattern[]
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
    <EntryItem 
      heading={getFormattedEntryDates(entry?.dates)}/>
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
        <p>This entry is <span className="text-gray-400 lowercase">{entry?.entryRating?.grade || "a draft"}</span></p>
        <div className="">
          {entry?.tags && entry.tags.map(entryTag => (
            <Tag key={entryTag.value} className={"bg-gray-200 mt-2"}>{entryTag.label}</Tag>
          ))}
        </div>
      </>
    </EntryItem>
  </div>
)

const StaticMapImage = (entry: Entry) => {
  const { lat, lng } = entry.location?.geopoint!
  const staticMapImageURL = `https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/pin-l+555555(${lng},${lat})/${lng},${lat},12,0/1280x400?access_token=pk.eyJ1IjoibXlzdGVyeWJlYXIiLCJhIjoiY2t6bzV6b2I3MzVybTJubzA1OWVqNGFhcCJ9.qHUcoQV2DBtX3qpCQytRTA`
  return (
    <div
      style={{ backgroundImage: `url("${staticMapImageURL}")` }}
      className="h-80 p-4 pt-2 flex flex-col justify-between bg-center bg-cover"
    ></div>
  )
}

export const EntryLayout = (props: EntryLayoutProps) => {
  const { entry, patterns, patternClasses, carouselItems } = props
  return (
    <div className="bg-white z-20 text-white fixed inset-y-0 right-0 max-w-4xl overflow-y-auto no-scrollbar">
      {}
      <EntryHeader {...entry} />
      <EntryDetails {...entry} />
      <Chart rollupToPatternClass={false} showLabels={true} terms={entry?.terms} entryId={entry?._id} />
      { entry?.tenureType && <Carousel data={carouselItems} title={`Other examples of ${getFormattedTenureTypes(entry?.tenureType)}`} cardClassNames="bg-gray-200"/> }
      { entry?.location?.geopoint && <StaticMapImage {...entry}/>}
      {/* <Footer /> */}
    </div>
  )
}
