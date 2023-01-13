import React, { useState } from "react"
import css from "@/styles/Sidebar.module.css"
import { motion } from "framer-motion"
import theme from "tailwindcss/defaultTheme"

const ColoredRow = ({ color }: { color: string }) => (
  <div style={{ backgroundColor: color }}>
    {`lalalalalalalalalalalalalalalalalalalalalalalalalalalalala`}
  </div>
)

const Chevvy = (props: any) => (
  <div className={css.chevvy} {...props}>
    <motion.div
      variants={{
        closed: {
          x: `${theme.spacing[6]}`,
        },
        open: {
          x: 0,
        },
      }}
    >
      {props?.open ? `<` : `>`}
    </motion.div>
  </div>
)

const Sidebar = () => {
  const [open, setOpen] = useState(false)
  const toggleOpen = () => void setOpen((p) => !p)

  return (
    <motion.div
      variants={{
        closed: {
          x: `calc(-100% + ${theme.spacing[1]})`,
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
    >
      <Chevvy onClick={toggleOpen} open={open} />
      <ColoredRow color="red" />
      <ColoredRow color="green" />
      <ColoredRow color="blue" />
      <ColoredRow color="pink" />
      <ColoredRow color="black" />
      <ColoredRow color="yellow" />
    </motion.div>
  )
}
export default Sidebar
