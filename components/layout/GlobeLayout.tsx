import { AnimatePresence } from "framer-motion"
import { PropsWithChildren, ReactElement } from "react"
import Footer from "../Footer"
import MapboxGlobe from "../map/MapboxGlobe"
import Sidebar from "../sidebar/Sidebar"

type Props = PropsWithChildren<{}>

const GlobeLayoutComponent = (props: Props) => {
  const { children } = props

  return (
    <>
      {/* <Header /> */}
      <Sidebar />
      <div className="absolute w-full h-3/4">
        <MapboxGlobe />
        <AnimatePresence>{children}</AnimatePresence>
      </div>
      <Footer />
    </>
  )
}

const GlobeLayout = (page: ReactElement) => (
  <GlobeLayoutComponent>{page}</GlobeLayoutComponent>
)

export default GlobeLayout
