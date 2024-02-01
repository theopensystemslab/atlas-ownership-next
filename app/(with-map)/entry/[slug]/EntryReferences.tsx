import { Entry } from "@/app/utils/sanity/types"
import { ArrowUpRight } from "@carbon/icons-react"

const EntryReferences = (entry?: Entry) => (
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

export default EntryReferences
