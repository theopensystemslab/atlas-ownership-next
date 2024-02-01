"use client"
import React, { PropsWithChildren } from "react"
import { motion } from "framer-motion"
import "client-only"
import { usePathname } from "next/navigation"

const EntryPopout = ({ children }: PropsWithChildren<{}>) => {
  const pathname = usePathname()
  const entryOpen = pathname.startsWith(`/entry/`)

  return (
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
  )
}

export default EntryPopout
