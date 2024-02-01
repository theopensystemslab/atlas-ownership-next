import { getEntries } from "@/app/utils/sanity/queries"
import React from "react"
import SearchClientComponent from "./SearchClientComponent"

const Search = async () => {
  const entries = await getEntries()

  return <SearchClientComponent entries={entries} />
}

export default Search
