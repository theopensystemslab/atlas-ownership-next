import css from "./Sidebar.module.css"
import { pipe } from "fp-ts/lib/function"
import { motion } from "framer-motion"
import theme from "tailwindcss/defaultTheme"
import { A } from "../../lib/fp"
import { trpc } from "../../lib/trpc"
import Accordion, { AccordionItemData } from "./Accordion"
import { ChevronLeft, ChevronRight } from "@carbon/icons-react"
import { toggleSidebar, useStore } from "lib/store"
import { ChangeEvent } from "react"
import { EntryType, Pattern } from "@/lib/types"
import selection, { useSelection } from "./selection"

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

const EntryTypeAccordion = () => {
  const { entryTypes } = useSelection();

  const entryTypeData: EntryType[] = [
    { title: "Innovative", value: "innovative" },
    { title: "Typical", value: "typical" },
    { title: "Historical", value: "historical" },
  ]

  const handleEntryTypeChange = (e: ChangeEvent<HTMLInputElement>, data: Pattern | EntryType) => {
    const entryType = data as EntryType
    if (e.target.checked && !entryTypes.includes(entryType.value)) {
      selection.entryTypes.push(entryType.value)
    } else if (!e.target.checked && entryTypes.includes(entryType.value)) {
      selection.entryTypes = selection.entryTypes.filter(
        (x) => x !== entryType.value
      )
    }
    console.log(selection.entryTypes)
  }

  return (
    <Accordion
      group={{
        name: "Entry types",
        color: "white"
      }}
      itemChange={handleEntryTypeChange}
      items={pipe(
        entryTypeData,
        A.map((entryType) => ({ checked: entryTypes.includes(entryType.value), _id: entryType.value, displayText: entryType.title, data: entryType }))
      )}
    />
  )
}

const PatternClassAccordion = () => {
  const { data: patternClasses = [] } = trpc.patternClasses.useQuery()
  const { data: patterns = [] } = trpc.patternsWithClass.useQuery()

  const { patternNames } = useSelection();

  const handlePatternChange = (e: ChangeEvent<HTMLInputElement>, data: Pattern | EntryType) => {
    const pattern = data as Pattern;
    if (e.target.checked && !patternNames.includes(pattern.name)) {
      selection.patternNames.push(pattern.name)
    } else if (!e.target.checked && patternNames.includes(pattern.name)) {
      selection.patternNames = selection.patternNames.filter(
        (x) => x !== pattern.name
      )
    }
    console.log(selection.patternNames)
  }

  return (
    <>
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
              A.map((pattern) => ({ checked: patternNames.includes(pattern.name), _id: pattern._id, displayText: pattern.name, data: pattern }))
            )}
          />
        ))
      )}
    </>
  )
}

const Sidebar = () => {
  const isOpen = useStore().isSidebarOpen


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
      <EntryTypeAccordion />
      {/* <TenureTypeAccordion /> */}
      <PatternClassAccordion />

    </motion.div>
  )
}
export default Sidebar
