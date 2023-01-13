import { ArrowUpRight, Close } from "@carbon/icons-react"
import Link from "next/link"
import { Entry, Pattern, PatternClass, TenureType } from "../../lib/types"
import Back from "../Back"
import Chart from "../Chart"

interface EntryLayoutProps {
  entry?: Entry
  patterns?:  Pattern[]
  patternClasses?: PatternClass[]
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
    <h1 className="text-5xl w-1/2">{entry?.name}</h1>
  </div>
)

const EntryItem = ({ heading, className, children }: EntryItemProps) => (
  <section className={className}>
    <div role="doc-subtitle" className={`mb-1 ${children ? 'text-sm' : 'text-2xl'}`}>
      {heading}
    </div>
    {children}
  </section>
)

const References = (entry?: Entry) => (
  <>
    {entry?.references?.map((reference) => (
      <a key={reference._key} href={reference.link} className="text-sm text-gray-400 underline block">
        {reference.name} <ArrowUpRight className="ml-1 inline-flex" />
      </a>
    ))}
  </>
)

const EntryDetails = (entry?: Entry) => (
  <div className="bg-white text-black grid grid-cols-4 grid-rows-auto gap-x-4 gap-y-6 p-4">
    <EntryItem 
      className="col-span-2"
      heading={entry?.tenureType ? 
        entry.tenureType.map(type => TenureType[type]).join(" - ") 
        : "Unknown tenure type"
      }
    />
    <EntryItem heading={entry?.location?.region || "Unknown location"} />
    <EntryItem 
      heading={entry?.dates?.start ? 
        new Date(Date.parse(entry?.dates.start)).getFullYear() + " - " + (entry?.dates.end ? new Date(Date.parse(entry?.dates.end)).getFullYear() : "")
        : "Unknown dates"
    }/>
    <EntryItem heading="" className="col-span-4">
      <p className="text-sm mb-2">{entry?.description}</p>
    </EntryItem>
    {entry?.references?.length && (
      <EntryItem heading="More information" className="col-span-3">
        <References {...entry} />
      </EntryItem>
    )}
    <EntryItem heading="Entry status" className="col-span-1">
      <p className="text-gray-400">{entry?.status || "Unknown status"}</p>
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
  );
};

export const EntryLayout = (props: EntryLayoutProps) => {
  const { entry, patterns, patternClasses } = props

  return (
    <div className="bg-white z-20 text-white fixed inset-y-0 right-0 max-w-4xl overflow-y-auto no-scrollbar">{}
      <EntryHeader {...entry} />
      <EntryDetails {...entry} />
      <Chart rollupToPatternClass={false} showLabels={true} terms={entry?.terms} patterns={patterns} patternClasses={patternClasses} />
      { entry?.location?.geopoint && <StaticMapImage {...entry}/>}
      {/* <Footer /> */}
    </div>
  )
}
