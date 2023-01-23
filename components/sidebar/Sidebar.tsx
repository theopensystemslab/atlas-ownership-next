import css from "./Sidebar.module.css"
import { pipe } from "fp-ts/lib/function"
import { motion } from "framer-motion"
import theme from "tailwindcss/defaultTheme"
import { A } from "../../lib/fp"
import { trpc } from "../../lib/trpc"
import PatternClassAccordion from "./PatternClassAccordion"
import { ChevronLeft, ChevronRight } from "@carbon/icons-react"
import { useStore } from "lib/store"
import { useState } from "react"

const Chevvy = (props: any) => (
  <div className={css.chevvy} {...props}>
    <motion.div
      variants={{
        closed: {
          x: `${theme.spacing[8]}`,
        },
        open: {
          x: 0,
        },
      }}
    >
      {props?.open ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
    </motion.div>
  </div>
)

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const { data: patternClasses = [] } = trpc.patternClasses.useQuery()
  const { data: patterns = [] } = trpc.patternsWithClass.useQuery()

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
      animate={isOpen ? "open" : "closed"}
      initial="closed"
      className={css.root}
      transition={{
        type: "spring",
        damping: 25,
        mass: 0.9,
        stiffness: 120,
      }}
    >
      <Chevvy onClick={() => setIsOpen(!isOpen)} open={isOpen} />
      {pipe(
        patternClasses,
        A.map((patternClass) => (
          <PatternClassAccordion
            key={patternClass.name}
            patternClass={patternClass}
            patterns={pipe(
              patterns,
              A.filter((pattern) => pattern.class.name === patternClass.name)
            )}
          />
        ))
      )}
    </motion.div>
  )
}
export default Sidebar
