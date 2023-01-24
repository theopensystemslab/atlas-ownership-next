import css from "./Sidebar.module.css"
import { pipe } from "fp-ts/lib/function"
import { motion } from "framer-motion"
import theme from "tailwindcss/defaultTheme"
import { A } from "../../lib/fp"
import { trpc } from "../../lib/trpc"
import Accordion from "./Accordion"
import { ChevronLeft, ChevronRight } from "@carbon/icons-react"
import { toggleSidebar, useStore } from "lib/store"
import { ChangeEvent } from "react"

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
  const isOpen = useStore().isSidebarOpen

  const { data: patternClasses = [] } = trpc.patternClasses.useQuery()
  const { data: patterns = [] } = trpc.patternsWithClass.useQuery()

  const handlePatternChange = (e: ChangeEvent<HTMLInputElement>) => {
    // if (e.target.checked && !patternNames.includes(pattern.name)) {
    //   selection.patternNames.push(pattern.name)
    // } else if (!e.target.checked && patternNames.includes(pattern.name)) {
    //   selection.patternNames = selection.patternNames.filter(
    //     (x) => x !== pattern.name
    //   )
    // }
    // console.log(selection.patternNames)
    console.log("handlePatternChange")
  }

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
      <Chevvy onClick={toggleSidebar} open={isOpen} />
      {pipe(
        patternClasses,
        A.map((patternClass) => (
          <Accordion
            key={patternClass.name}
            group={{ 
              name: patternClass.name, 
              description: patternClass.description, 
              color: patternClass.color.hex
            }}
            itemChange={handlePatternChange}
            items={pipe(
              patterns,
              A.filter((pattern) => pattern.class.name === patternClass.name),
              A.map((pattern) => ({ checked: true, _id: pattern._id, displayText: pattern.name}))
            )}
          />
        ))
      )}
    </motion.div>
  )
}
export default Sidebar
