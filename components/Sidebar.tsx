import React, { useState } from "react"
import css from "@/styles/Sidebar.module.css"
import { motion } from "framer-motion"
import theme from "tailwindcss/defaultTheme"

const Sidebar = () => {
  const [open, setOpen] = useState(false)
  const toggleOpen = () => void setOpen((p) => !p)

  return (
    <motion.div
      variants={{
        closed: {
          x: `calc(-100% + ${theme.spacing[12]})`,
        },
        open: {
          x: 0,
        },
      }}
      animate={open ? "open" : "closed"}
      initial="closed"
      className={css.root}
      transition={{
        type: "spring",
        damping: 25,
        mass: 0.9,
        stiffness: 120,
      }}
      onClick={toggleOpen}
    >
      {"foo bar ding quat poo pah ling loo"}
    </motion.div>
  )
}
export default Sidebar
