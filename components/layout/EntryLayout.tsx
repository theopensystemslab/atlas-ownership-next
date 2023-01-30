import { getFormattedEntryDates, getFormattedTenureTypes } from "@/lib/entry"
import { useWindowDimensions } from "@/lib/utils"
import { ArrowRight, ArrowUpRight, Close } from "@carbon/icons-react"
import Link from "next/link"
import { useState } from "react"
import { CarouselItem, Entry } from "../../lib/types"
import Back from "../Back"
import { Carousel } from "../carousel/Carousel"
import Chart from "../Chart"
import { Tag } from "./ui/Tag"

interface EntryLayoutProps {
  entry?: Entry
  carouselItems?: CarouselItem[]
}

interface EntryItemProps {
  heading: string
  className?: string
  children?: React.ReactNode
}

// "true" enables toggling between two chart styles
//    helpful for debugging math between pattern classes & individual terms!
const DEBUG_CHARTS = false

const EntryHeader = (entry?: Entry) => (
  <div
    // TODO: The sanity image pipeline could get us an optimized image here
    // https://www.sanity.io/docs/presenting-images
    style={{ backgroundImage: `url(${entry?.mainImage?.file?.asset?.url})` }}
    className="h-80 p-8 pt-2 flex flex-col justify-between bg-center bg-cover"
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
      <h1 className="text-3xl sm:text-5xl w-2/3 sm:w-1/2">{entry?.name}</h1>
      <Tag className="bg-white">{entry?.type}</Tag>
    </div>
  </div>
)

const EntryItem = ({ heading, className, children }: EntryItemProps) => (
  <section className={className}>
    <div
      role="doc-subtitle"
      className={`mb-1 ${children ? "text-sm" : "text-base sm:text-2xl"}`}
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
  <div className="bg-white text-black grid grid-cols-4 grid-rows-auto gap-x-4 gap-y-1 sm:gap-y-6 p-8">
    <EntryItem
      className="col-span-4 sm:col-span-2"
      heading={getFormattedTenureTypes(entry?.tenureType)}
    />
    <EntryItem
      className="col-span-2 sm:col-span-1"
      heading={entry?.location?.region || "Unknown location"}
    />
    <EntryItem
      className="col-span-2 sm:col-span-1 text-right sm:text-left"
      heading={getFormattedEntryDates(entry?.dates)}
    />
    <EntryItem heading="" className="col-span-4">
      <p className="text-sm mt-4 sm:mt-0 mb-1 sm:mb-2 whitespace-pre-wrap">
        {entry?.description}
      </p>
    </EntryItem>
    {entry?.references?.length && (
      <EntryItem heading="More information" className="col-span-2">
        <References {...entry} />
      </EntryItem>
    )}
    <EntryItem heading="Rating" className="col-span-2">
      <>
        <p className="text-sm">
          This entry is{" "}
          <span className="text-gray-400 text-sm lowercase">
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
  const [showRollup, setShowRollup] = useState(false)

  const { width } = useWindowDimensions()

  return (
    <div className="text-white">
      <EntryHeader {...entry} />
      <EntryDetails {...entry} />
      {entry?.terms?.length && (
        <Chart
          rollupToPatternClass={showRollup}
          showLabels={width && width > 450 ? true : false}
          terms={entry?.terms}
          entryId={entry?._id}
        />
      )}
      {DEBUG_CHARTS && (
        <form className="flex m-3 p-3 bg-gray-200">
          <div className="text-black text-sm mr-2">Chart by:</div>
          <div className="radio text-black text-sm mr-3">
            <label>
              <input
                type="radio"
                value="patternClass"
                checked={showRollup === true}
                onChange={() => setShowRollup(!showRollup)}
                className="mr-1 ml-1"
              />
              Pattern class
            </label>
          </div>
          <div className="radio text-black text-sm mr-3">
            <label>
              <input
                type="radio"
                value="term"
                checked={showRollup === false}
                onChange={() => setShowRollup(!showRollup)}
                className="mr-1 ml-1"
              />
              Terms
            </label>
          </div>
        </form>
      )}
      {entry?.tenureType && (
        <div className="m-4">
        <Carousel
          data={carouselItems}
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
