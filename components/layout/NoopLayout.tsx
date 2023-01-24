import { PropsWithChildren, ReactElement } from "react"
import { PageNavbar } from "../PageNavbar"

type Props = PropsWithChildren<{}>

const NoopLayoutComponent = (props: Props) => {
  const { children } = props

  return (
    <div className="bg-black z-20 text-white max-w-full fixed inset-0 overflow-y-auto overflow-x-auto">
      <PageNavbar/>
      <div className="m-8 mr-0">
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
