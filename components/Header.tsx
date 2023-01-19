import { Search as SearchIcon, SettingsAdjust } from "@carbon/icons-react"
import { toggleSidebar } from "lib/store"

const Search = () => {
  return (
    <div className="flex items-stretch h-10 justify-center">
      <SearchIcon size={24} color={"white"} className="mt-2" />
      <input
        type="text"
        placeholder="Search the atlas"
        className="pl-2 bg-transparent text-white"
      />
      <SettingsAdjust size={24} className="text-white mt-2 mr-4 cursor-pointer" onClick={toggleSidebar}/>
      <button className="bg-white text-black px-6 h-auto">Search</button>
    </div>
  )
}

const Header = () => (
  <header className="absolute z-10 w-full flex justify-between">
    <div className="p-10 w-1/4 text-white">
      <h1 className="text-4xl fill-black">The Atlas of Ownership</h1>
      <h2 className="text-lg pt-3">
        A map of property rights and obligations across time and space
      </h2>
      <a className="text-lg text-gray-500">Why?</a>
    </div>
    <Search />
  </header>
)

export default Header
