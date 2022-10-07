import { Search as SearchIcon } from "@carbon/icons-react"

const Search = () => {
  return (
    <div className="flex items-stretch h-10">
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
    <div className="p-10 w-1/3 text-white">
      <h1 className="text-4xl fill-black">The Atlas of Ownership</h1>
      <h2 className="text-xl">
        A library of land ownership and tenure models across time and geography
      </h2>
      <a className="text-xl text-gray-500">Find out more &or;</a>
    </div>
    <Search />
  </header>
)

export default Header
