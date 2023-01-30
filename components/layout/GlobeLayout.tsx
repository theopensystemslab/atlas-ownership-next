import { motion } from "framer-motion"
import { useRouter } from "next/router"
import { PropsWithChildren, ReactElement } from "react"
import Footer from "../Footer"
import Header from "../Header"
import MapboxGlobe from "../map/MapboxGlobe"
import Sidebar from "../sidebar/Sidebar"

type Props = PropsWithChildren<{}>

const GlobeLayoutComponent = (props: Props) => {
  const { children } = props

  const router = useRouter()
  const entryOpen = router.pathname.startsWith(`/entry/`)

  return (
    <div className="min-w-full fixed inset-0 overflow-y-auto overflow-x-auto">
      <Header />
      <Sidebar />
      <div className="absolute w-full h-3/4">
        <MapboxGlobe />
      </div>
      <motion.div
        className="h-full w-full sm:w-1/2 absolute top-0 right-0 bg-white overflow-y-auto no-scrollbar z-50"
        variants={{
          open: {
            x: "0%",
          },
          closed: {
            x: "100%",
          },
        }}
        animate={entryOpen ? "open" : "closed"}
        initial="closed"
        transition={{
          duration: 1,
        }}
      >
        {children}
      </motion.div>
      <Footer />
    </div>
  )
}

const GlobeLayout = (page: ReactElement) => (
  <GlobeLayoutComponent>{page}</GlobeLayoutComponent>
)

export default GlobeLayout
