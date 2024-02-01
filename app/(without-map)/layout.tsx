import { PropsWithChildren } from "react"
import { PageNavbar } from "../ui/PageNavbar"

type Props = PropsWithChildren<{}>

const NoMapLayout = (props: Props) => {
  const { children } = props

  return (
    <div className="bg-black z-20 text-white max-w-full fixed inset-0 overflow-y-auto overflow-x-auto">
      <PageNavbar />
      <div className="m-4 sm:m-8 sm:mr-0">{children}</div>
    </div>
  )
}

export default NoMapLayout
