"use client"
import "client-only"
import { Search as SearchIcon } from "@carbon/icons-react"
import clsx from "clsx"
import { pipe } from "fp-ts/lib/function"
import { truncate } from "lodash"
import { matchSorter } from "match-sorter"
import Link from "next/link"
import { ChangeEvent, useEffect, useRef, useState } from "react"
import usePortal from "react-cool-portal"
import { useKey } from "react-use"
import { useDebouncedCallback } from "use-debounce"
import css from "./Search.module.css"
import { motion } from "framer-motion"
import { Entry } from "../../utils/sanity/types"
import { useClickAway } from "../../utils/dom"
import { A } from "../../utils/fp"

const SearchResult = ({
  entry,
  onClick,
}: {
  entry: Entry
  onClick?: () => void
}) => {
  return (
    <div className={css.result}>
      <Link href={`/entry/${entry.slug?.current}`} onClick={onClick}>
        <div>
          <h1>{entry.name}</h1>
          <p>
            {truncate(entry?.content?.[0].children[0].text ?? "", {
              length: 280,
              separator: " ",
            })}
          </p>
        </div>
      </Link>
    </div>
  )
}

const SearchClientComponent = ({ entries }: { entries: Entry[] }) => {
  const [results, setResults] = useState<Entry[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)

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

  const rootRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const clear = () => {
    setSearchQuery("")
    if (inputRef.current) inputRef.current.value = ""
  }

  useKey("Escape", clear)
  useClickAway(rootRef, clear)

  return (
    <div ref={rootRef}>
      <div className={css.searchRoot}>
        <label className={css.searchLabel}>
          <SearchIcon size={24} color={"white"} />
        </label>
        <input
          ref={inputRef}
          id="search"
          type="text"
          onChange={handler}
          placeholder="Search the atlas"
          className={css.searchInput}
        />
      </div>
      <div className="flex items-stretch h-10 mr-4 justify-end md:hidden">
        <label className={css.searchLabel}>
          <SearchIcon
            size={24}
            color={"white"}
            onClick={() => setIsOpen(!isOpen)}
          />
        </label>
        <motion.input
          variants={{
            open: {
              width: "100%",
              visibility: "visible",
            },
            closed: {
              width: "0%",
              visibility: "hidden",
            },
          }}
          animate={isOpen ? "open" : "closed"}
          initial="closed"
          transition={{
            duration: 1,
          }}
          ref={inputRef}
          id="search"
          type="text"
          onChange={handler}
          placeholder="Search the atlas"
          className={css.searchInput}
        ></motion.input>
      </div>
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
    </div>
  )
}

export default SearchClientComponent
