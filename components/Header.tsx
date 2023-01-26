import Link from "next/link"
import Search from "./Search"

const Header = () => (
  <header className="absolute z-10 w-full flex justify-between pointer-events-none">
    <div className="p-10 w-1/4 text-white">
      <h1 className="text-4xl fill-black">The Atlas of Ownership</h1>
      <h2 className="text-lg pt-3">
        A map of property rights and obligations across time and space
      </h2>
      <div className="pointer-events-auto mt-2">
        <Link href="/about" className="text-lg text-gray-500">
          Why?
        </Link>
      </div>
    </div>
    <Search />
  </header>
)

export default Header
