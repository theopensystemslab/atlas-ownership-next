import { Search as SearchIcon, SettingsAdjust } from "@carbon/icons-react"
import { ChangeEvent, Fragment, useEffect, useRef, useState } from "react"
import { useDebouncedCallback } from "use-debounce"
import { trpc } from "../lib/trpc"
import { matchSorter } from "match-sorter"
import { Entry } from "../lib/types"
import { pipe } from "fp-ts/lib/function"
import { A } from "../lib/fp"
import css from "./Search.module.css"
import { toggleSidebar } from "../lib/store"
import usePortal from "react-cool-portal"
import Link from "next/link"
import { truncate } from "lodash"
import clsx from "clsx"

const SearchResult = ({
  entry,
  onClick,
}: {
  entry: Entry
  onClick?: () => void
}) => {
  return (
    <div className={css.result}>
      <Link
        href={`/entry/${entry.slug?.current}`}
        onClick={onClick}
        legacyBehavior={false}
      >
        <div>
          <h1>{entry.name}</h1>
          <p>{truncate(entry.description, { length: 280, separator: " " })}</p>
          {/* <div>
        {entry.slug?.current && (
        )}
      </div> */}
        </div>
      </Link>
    </div>
  )
}

const Search = () => {
  const { data: entries = [] } = trpc.entries.useQuery()

  const [results, setResults] = useState<Entry[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  const { Portal } = usePortal({
    autoRemoveContainer: false,
    internalShowHide: false,
  })

  const handler = useDebouncedCallback(
    (e: ChangeEvent<HTMLInputElement>) => void setSearchQuery(e.target.value),
    100
  )

  useEffect(() => {
    if (searchQuery.length === 0) return

    const terms = searchQuery.split(" ")

    const results = terms.reduceRight(
      (results, term) =>
        matchSorter(results, term, {
          keys: ["name", "description", "patterns.*.name"],
          threshold: matchSorter.rankings.ACRONYM,
        }),
      entries
    )

    setResults(results)
  }, [entries, searchQuery])

  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <Fragment>
      <div className={css.searchRoot}>
        <label>
          <SearchIcon size={24} color={"white"} />
        </label>
        <input
          ref={inputRef}
          id="search"
          type="text"
          onChange={handler}
          placeholder="Search the atlas"
        />
        {/* <button>
          <SettingsAdjust size={24} onClick={toggleSidebar} />
        </button> */}
      </div>
      {/* <button className="bg-white text-black px-6 h-auto">Search</button> */}
      {searchQuery.length > 0 && (
        <Portal>
          <div className={clsx(css.resultsRoot, "no-scrollbar")}>
            {pipe(
              results,
              A.map((result) => (
                <SearchResult
                  key={result._id}
                  entry={result}
                  onClick={() => {
                    if (!inputRef.current) return
                    inputRef.current.value = ""
                    setSearchQuery("")
                  }}
                />
              ))
            )}
          </div>
        </Portal>
      )}
    </Fragment>
  )
}

export default Search
