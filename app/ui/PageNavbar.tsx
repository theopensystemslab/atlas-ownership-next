import { Close } from "@carbon/icons-react"
import Link from "next/link"

export const PageNavbar = (props: { variant?: "light" }) => {
  const { variant } = props

  return (
    <nav className={`flex justify-between ml-4 sm:ml-8 mr-4 sm:mr-8 mt-3 h-12 ${variant == "light" ? "text-black" : ""}`}>
      <Link href="/" className="cursor-pointer">Atlas of Ownership</Link>
      <Link href="/" className="text-lg">
        <Close size={24} className="cursor-pointer" />
      </Link>
    </nav>
  )
}