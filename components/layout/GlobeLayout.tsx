import { AnimatePresence } from "framer-motion"
import React, { PropsWithChildren } from "react"
import Footer from "../Footer"
import Header from "../Header"
import MapboxGlobe from "../map/MapboxGlobe"
import Sidebar from "../sidebar/Sidebar"

type Props = PropsWithChildren<{}>

const GlobeLayout = (props: Props) => {
  const { children } = props
  return (
    <>
      <Header />
      <Sidebar />
      <div className="absolute w-full h-3/4">
        <MapboxGlobe />
        <AnimatePresence>{children}</AnimatePresence>
      </div>
      <Footer />
    </>
  )
}

export default GlobeLayout
