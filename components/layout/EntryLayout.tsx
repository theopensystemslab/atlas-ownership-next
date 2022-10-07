import Link from "next/link"
import { Close, ArrowUpRight } from "@carbon/icons-react"
import { Entry } from "../../lib/types"

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
      <Link href="../">The Atlas of Ownership</Link>
      <Link href="../">
        <Close size={32} className="cursor-pointer" />
      </Link>
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
    <EntryItem heading="Model" className="col-span-2">
      {/* TODO: What is this value...? */}
      <p className="text-2xl">Plot Lease</p>
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
      <EntryItem heading="Useful Resources" className="col-span-2">
        <References {...entry} />
      </EntryItem>
    )}
  </div>
)

export const EntryLayout = (entry?: Entry) => (
  <div className="bg-white z-20 text-white absolute inset-0 max-w-4xl m-auto">
    <EntryHeader {...entry} />
    <EntryDetails {...entry} />
    <div className="bg-sky-700 h-96 place-items-center grid text-2xl">
      CHART
    </div>
    <div className="bg-teal-900 h-96 place-items-center grid text-2xl">
      STATIC MAP
    </div>
    {/* Get Footer component once merged */}
    <footer className="bg-black h-64 place-items-center grid text-2xl">
      FOOTER
    </footer>
  </div>
)
