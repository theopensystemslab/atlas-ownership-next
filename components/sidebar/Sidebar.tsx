import css from "./Sidebar.module.css"
import { pipe } from "fp-ts/lib/function"
import { motion } from "framer-motion"
import theme from "tailwindcss/defaultTheme"
import { A } from "../../lib/fp"
import { trpc } from "../../lib/trpc"
import Accordion, { EntryFilterData, AccordionItemData } from "./Accordion"
import { ChevronLeft, ChevronRight, Hotel } from "@carbon/icons-react"
import { toggleSidebar, useStore } from "lib/store"
import { ChangeEvent } from "react"
import { EntryType, Pattern, TenureType } from "@/lib/types"
import { deselectEntryType, deselectPattern, deselectTenureType, selectEntryType, selectPattern, selectTenureType, useSelection } from "./selection"
import clsx from "clsx"

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
  const { entryType: selectedEntryType } = useSelection();

  const entryTypeData: EntryType[] = [
    { title: "Innovative", value: "innovative" },
    { title: "Typical", value: "typical" },
    { title: "Historical", value: "historical" },
  ]

  const handleEntryTypeChange = (e: ChangeEvent<HTMLInputElement>, data: EntryFilterData) => {
    const entryType = data as EntryType
    e.target.checked ? selectEntryType(entryType) : deselectEntryType();
  }

  const getEntryTypeIcon = (entryType: EntryType) => (
    <div className={
      clsx("rounded-full block h-5 w-5", { 
        "bg-black": entryType.value === "typical", 
        "bg-gray-300": entryType.value === "historical", 
        "border-black border-2": entryType.value === "innovative"
      })}></div>
  )

  return (
    <Accordion
      group={{
        name: "Entry types",
        color: "white"
      }}
      itemChange={handleEntryTypeChange}
      items={pipe(
        entryTypeData,
        A.map((entryType) => ({ checked: selectedEntryType === entryType.value, _id: entryType.value, displayText: entryType.title, data: entryType, icon: getEntryTypeIcon(entryType) }))
      )}
    />
  )
}

const TenureTypeAccordion = () => {
  const { tenureTypes } = useSelection();

  const getTenureTypeIcon = (tenureType: TenureType) => <div className="text-lg w-5">{tenureType.substring(0, 2)}</div>

  const tenureTypeData: AccordionItemData[] = Object.values(TenureType).map(tenureType => ({
    _id: tenureType,
    checked: tenureTypes.includes(tenureType),
    data: tenureType,
    displayText: tenureType,
    icon: getTenureTypeIcon(tenureType)
  }))

  const handleTenureTypeChange = (e: ChangeEvent<HTMLInputElement>, data: EntryFilterData) => {
    const tenureType = data as TenureType;
    e.target.checked ? selectTenureType(tenureType) : deselectTenureType(tenureType);
  }

  return (
    <Accordion
      group={{
        name: "Models",
        color: "#DBDBDB"
      }}
      itemChange={handleTenureTypeChange}
      items={tenureTypeData}
    />
  )
}

const PatternClassAccordion = () => {
  const { data: patternClasses = [] } = trpc.patternClasses.useQuery()
  const { data: patterns = [] } = trpc.patternsWithClass.useQuery()

  const { patternNames } = useSelection();

  const handlePatternChange = (e: ChangeEvent<HTMLInputElement>, data: EntryFilterData) => {
    const pattern = data as Pattern;
    e.target.checked ? selectPattern(pattern) : deselectPattern(pattern)
  }

  const placeholderPatternClassIcon = <Hotel size={24} />

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
              A.map((pattern) => ({ checked: patternNames.includes(pattern.name), _id: pattern._id, displayText: pattern.name, data: pattern, icon: placeholderPatternClassIcon }))
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
      <TenureTypeAccordion />
      <PatternClassAccordion />

    </motion.div>
  )
}
export default Sidebar
