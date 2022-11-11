import { ArrowUpRight, Close } from "@carbon/icons-react"
import { Entry, Pattern, PatternClass, TenureType } from "../../lib/types"
import Back from "../Back"
import Chart from "../Chart"
import Footer from "../Footer"

interface EntryLayoutProps {
  entry?: Entry
  patterns?:  Pattern[]
  patternClasses?: PatternClass[]
}

interface EntryItemProps {
  heading: string
  className?: string
  children: React.ReactNode
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
        <a>The Atlas of Ownership</a>
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
    <div role="doc-subtitle" className="text-sm mb-1">
      {heading}
    </div>
    {children}
  </section>
)

const References = (entry?: Entry) => (
  <>
    {entry?.references?.map((reference) => (
      <a key={reference._key} href={reference.link} className="text-sm block">
        {reference.name} <ArrowUpRight className="ml-1 inline-flex" />
      </a>
    ))}
  </>
)

const EntryDetails = (entry?: Entry) => (
  <div className="bg-white text-black grid grid-cols-4 grid-rows-auto gap-x-4 gap-y-6 p-4">
    <EntryItem heading="Tenure type" className="col-span-2">
      <p className="text-2xl">{
        entry?.tenureType 
          ? entry.tenureType.map(type => TenureType[type]).join(" - ") 
          : "Unknown"
      }</p>
    </EntryItem>
    <EntryItem heading="Location">
      <p className="text-2xl">{entry?.location?.region}</p>
    </EntryItem>
    <EntryItem heading="Dates">
      {entry?.dates?.start ? (
        <p className="text-2xl">
          {new Date(Date.parse(entry?.dates.start)).getFullYear() + " - "}
          {entry?.dates.end &&
            new Date(Date.parse(entry?.dates.end)).getFullYear()}
        </p>
      ) : (
        <p className="text-2xl">Unknown</p>
      )}
    </EntryItem>
    <EntryItem heading="Description" className="col-span-2">
      <p className="text-sm">{entry?.description}</p>
    </EntryItem>
    {entry?.references?.length && (
      <EntryItem heading="References" className="col-span-2">
        <References {...entry} />
      </EntryItem>
    )}
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
    <div className="bg-white z-20 text-white fixed inset-0 max-w-4xl m-auto overflow-y-auto no-scrollbar">{}
      <EntryHeader {...entry} />
      <EntryDetails {...entry} />
      <div className="bg-white h-96 place-items-center grid text-2xl">
        <Chart showLabels={true} terms={entry?.terms} patterns={patterns} patternClasses={patternClasses} />
      </div>
      { entry?.location?.geopoint && <StaticMapImage {...entry}/>}
      {/* <Footer /> */}
    </div>
  )
}
