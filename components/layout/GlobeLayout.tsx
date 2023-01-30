import { ArrowRight } from "@carbon/icons-react"
import { motion } from "framer-motion"
import { useRouter } from "next/router"
import { PropsWithChildren, ReactElement } from "react"
import Footer from "../Footer"
import Header from "../Header"
import MapboxGlobe from "../map/MapboxGlobe"
import Sidebar from "../sidebar/Sidebar"

type Props = PropsWithChildren<{}>

const SubmitButton = () => (
  <div className="grid absolute bottom-0 right-0 w-full gap-4 pl-20 auto-cols-fr">
    <a href="https://airtable.com/shru3ZGjdyhEGTzx6" target="_blank" rel="noreferrer" className="bg-white text-black flex items-center justify-center h-10 col-start-7 col-span-2">
      Submit an entry <ArrowRight className="ml-2" size={16} />
    </a>
  </div>
)

const GlobeLayoutComponent = (props: Props) => {
  const { children } = props

  const router = useRouter()
  const entryOpen = router.pathname.startsWith(`/entry/`)

  return (
    <>
    <Sidebar />
    <div className="min-w-full fixed inset-0 overflow-y-auto overflow-x-hidden">
      <Header />
      <div className="w-full h-screen max-h-[75vh] relative">
        <MapboxGlobe />
        <SubmitButton />
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
    </>
  )
}

const GlobeLayout = (page: ReactElement) => (
  <GlobeLayoutComponent>{page}</GlobeLayoutComponent>
)

export default GlobeLayout
