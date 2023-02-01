import Link from "next/link"
import css from "./Header.module.css"
import Search from "./Search"

const Header = () => (
  <header className="absolute z-10 w-full flex justify-between pointer-events-none text-sm">
    <div className="pl-16 pt-20 sm:pt-10 pr-5 w-3/4 sm:w-1/2 md:w-1/4 text-white">
      <h1 className="title">The Atlas of Ownership</h1>
      <h2 className="text-sm sm:text-lg pt-3">
        A map of property rights and obligations across time and space
      </h2>
      <Link href="/about">
        <a className="pointer-events-auto mt-2 text-sm sm:text-lg opacity-75 underline hover:opacity-100">About</a>
      </Link>
    </div>
    <div className="h-fit mt-4 flex gap-10 pointer-events-auto text-white">
      <Link href="/patterns">
        <a className={css.link}>Patterns</a>
        </Link>
      <Link href="/about">
        <a className={css.link}>About</a>
      </Link>
      <Search />

    </div>
  </header>
)

export default Header
