import { Search as SearchIcon } from "@carbon/icons-react"
import Link from "next/link"

const Search = () => {
  return (
    <div className="flex items-stretch h-10 justify-center pointer-events-auto">
      <SearchIcon size={24} color={"white"} className="mt-2" />
      <input
        type="text"
        placeholder="Search the atlas"
        className="pl-2 bg-transparent text-white"
      />
      <button className="bg-white text-black px-6 h-auto">Search</button>
    </div>
  )
}

const Header = () => (
  <header className="absolute z-10 w-full flex justify-between pointer-events-none">
    <div className="p-10 w-1/4 text-white">
      <h1 className="text-4xl fill-black">The Atlas of Ownership</h1>
      <h2 className="text-lg pt-3">
        A map of property rights and obligations across time and space
      </h2>
      <Link href="/about">
        <a className="text-lg text-gray-500 pointer-events-auto" >Why?</a>
      </Link>
    </div>
    <Search />
  </header>
)

export default Header
