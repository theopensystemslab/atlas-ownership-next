import { Search as SearchIcon } from "@carbon/icons-react"
import { ChangeEvent, Fragment, useState } from "react"
import { useDebouncedCallback } from "use-debounce"
import { trpc } from "../lib/trpc"
import { matchSorter } from "match-sorter"
import { Entry } from "../lib/types"
import { pipe } from "fp-ts/lib/function"
import { A } from "../lib/fp"

// import { Search as SearchIcon, SettingsAdjust } from "@carbon/icons-react"
// import { toggleSidebar } from "lib/store"

// const Search = () => {
//   return (
//     <div className="flex items-stretch h-10 justify-center">
//       <SearchIcon size={24} color={"white"} className="mt-2" />
//       <input
//         type="text"
//         placeholder="Search the atlas"
//         className="pl-2 bg-transparent text-white"
//       />
//       <SettingsAdjust size={24} className="text-white mt-2 mr-4 cursor-pointer" onClick={toggleSidebar}/>
//       <button className="bg-white text-black px-6 h-auto">Search</button>
//     </div>
//   )
// }

const SearchResult = () => {
  return null
}

const Search = () => {
  const { data: entries = [] } = trpc.entries.useQuery()

  const [results, setResults] = useState<Entry[]>([])

  const handler = useDebouncedCallback(
    (e: ChangeEvent<HTMLInputElement>) =>
      setResults(
        matchSorter(entries, e.target.value, {
          keys: ["name", "description", "patterns.*.name"],
        })
      ),
    100
  )

  return (
    <Fragment>
      <div>
        <label className="bg-pink-500">
          <SearchIcon size={24} color={"white"} className="mt-2" />
        </label>
        <input id="search" type="text" onChange={handler} />
      </div>
      {results.length > 0 && (
        <div className="absolute z-50 w-1/3 h-1/3 inset-0 bg-red-500">
          {pipe(
            results,
            A.map((result) => <SearchResult key={result._id} {...{}} />)
          )}
        </div>
      )}
    </Fragment>
  )
}

export default Search
