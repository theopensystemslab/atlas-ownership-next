import { Search as SearchIcon, SettingsAdjust } from "@carbon/icons-react"
import { ChangeEvent, Fragment, useState } from "react"
import { useDebouncedCallback } from "use-debounce"
import { trpc } from "../lib/trpc"
import { matchSorter } from "match-sorter"
import { Entry } from "../lib/types"
import { pipe } from "fp-ts/lib/function"
import { A } from "../lib/fp"
import css from "./Search.module.css"
import { toggleSidebar } from "../lib/store"
import usePortal from "react-cool-portal"

const SearchResult = ({ entry }: { entry: Entry }) => {
  return (
    <div className={css.result}>
      <pre>{JSON.stringify(entry, null, 2)}</pre>
    </div>
  )
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

  const { Portal } = usePortal()

  return (
    <Fragment>
      <div className={css.searchRoot}>
        <label>
          <SearchIcon size={24} color={"white"} />
        </label>
        <input
          id="search"
          type="text"
          onChange={handler}
          placeholder="Search the atlas"
        />
        <button>
          <SettingsAdjust size={24} onClick={toggleSidebar} />
        </button>
      </div>
      {/* <button className="bg-white text-black px-6 h-auto">Search</button> */}
      {results.length > 0 && (
        <Portal>
          <div className={css.resultsRoot}>
            {pipe(
              results,
              A.map((result) => (
                <SearchResult key={result._id} entry={result} />
              ))
            )}
          </div>
        </Portal>
      )}
    </Fragment>
  )
}

export default Search
