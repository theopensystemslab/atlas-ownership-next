import { Search as SearchIcon, SettingsAdjust } from "@carbon/icons-react"
import { toggleSidebar } from "lib/store"
import Link from "next/link"

const Search = () => {
  return (
    <div className="flex h-10 pointer-events-auto">
      <SearchIcon size={24} color={"white"} className="m-2" />
      {/* <input
        type="text"
        placeholder="Search the atlas"
        className="pl-2 bg-transparent text-white text-sm sm:text-base border-b-1 border-white"
      /> */}
      {/* <SettingsAdjust size={24} className="text-white mt-2 mr-4 cursor-pointer" onClick={toggleSidebar}/> */}
      {/* <button className="bg-white text-black px-6 h-auto">Search</button> */}
    </div>
  )
}

const Header = () => (
  <header className="absolute z-10 w-full flex justify-between pointer-events-none">
    <div className="p-3 pt-12 sm:p-10 w-3/4 sm:w-1/4 text-white">
      <h1 className="font-semibold text-2xl sm:text-4xl fill-black">The Atlas of Ownership</h1>
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
