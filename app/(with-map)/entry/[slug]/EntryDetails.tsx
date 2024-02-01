import {
  getFormattedTenureTypes,
  getFormattedEntryDates,
} from "@/app/utils/sanity/entry"
import { Entry } from "@/app/utils/sanity/types"
import { Tag } from "@carbon/icons-react"
import EntryItem from "./EntryItem"
import EntryReferences from "./EntryReferences"
import EntryPortableText from "./EntryPortableText"

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
      <EntryPortableText value={entry?.content ?? []} />
    </EntryItem>
    {entry?.references?.length && (
      <EntryItem heading="More information" className="col-span-2">
        <EntryReferences {...entry} />
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

export default EntryDetails
