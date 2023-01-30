import { ArrowRight } from "@carbon/icons-react"
import { motion } from "framer-motion"
import { useRouter } from "next/router"
import { PropsWithChildren, ReactElement } from "react"
import css from "./GlobeLayout.module.css"
import Footer from "../Footer"
import Header from "../Header"
import MapboxGlobe from "../map/MapboxGlobe"
import Sidebar from "../sidebar/Sidebar"

type Props = PropsWithChildren<{}>

const SubmitButton = () => (
  <div className={css.submitButtonContainer}>
    <a href="https://airtable.com/shru3ZGjdyhEGTzx6" target="_blank" rel="noreferrer" className={css.submitButton}>
      Submit an entry <ArrowRight className="ml-2" size={16} />
    </a>
  </div>
)

const GlobeLayoutComponent = (props: Props) => {
  const { children } = props

  const router = useRouter()
  const entryOpen = router.pathname.startsWith(`/entry/`)

  return (
    <div className="min-w-full fixed inset-0 overflow-y-auto overflow-x-hidden">
      <Sidebar />
      <motion.div
        className="h-full w-full sm:w-1/2 absolute top-0 bottom-0 right-0 bg-white overflow-y-auto no-scrollbar z-50"
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
      <div className="min-w-full fixed inset-0 overflow-y-auto overflow-x-hidden">
        <Header />
        <div className="w-full h-screen max-h-[75vh] relative">
          <MapboxGlobe />
          <SubmitButton />
        </div>
        <Footer />
      </div>
    </div>
  )
}

const GlobeLayout = (page: ReactElement) => (
  <GlobeLayoutComponent>{page}</GlobeLayoutComponent>
)

export default GlobeLayout
