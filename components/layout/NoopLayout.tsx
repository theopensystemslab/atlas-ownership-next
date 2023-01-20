import { Close } from "@carbon/icons-react"
import Link from "next/link"
import { PropsWithChildren, ReactElement } from "react"

type Props = PropsWithChildren<{}>

const NoopLayoutComponent = (props: Props) => {
  const { children } = props

  return (
    <div className="bg-black z-20 text-white max-w-full fixed inset-0 overflow-y-auto overflow-x-auto">
      <nav className="flex justify-between ml-8 mr-8 mt-3 h-12">
        <Link href="/" className="cursor-pointer">Atlas of Ownership</Link>
        <Link href="/" className="text-lg">
          <Close size={24} className="cursor-pointer" />
        </Link>
      </nav>
      <div className="m-8">
        {children}
      </div>
      {/* <Footer /> */}
    </div>
  )
}

const NoopLayout = (page: ReactElement) => (
  <NoopLayoutComponent>{page}</NoopLayoutComponent>
)

export default NoopLayout
