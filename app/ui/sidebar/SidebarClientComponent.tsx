"use client"
import "client-only"
import css from "./Sidebar.module.css"
import { pipe } from "fp-ts/lib/function"
import { motion } from "framer-motion"
import theme from "tailwindcss/defaultTheme"
import Accordion, {
  EntryFilterData,
  AccordionItemData,
} from "../accordion/Accordion"
import {
  ChevronLeft,
  ChevronRight,
  RadioButton,
  RadioButtonChecked,
} from "@carbon/icons-react"
import { ChangeEvent, useEffect, useState } from "react"
import {
  deselectAll,
  deselectEntryType,
  deselectPattern,
  deselectTenureType,
  isSelectionEmpty,
  selectEntryType,
  selectPattern,
  selectTenureType,
  useSelection,
} from "./selection"
import clsx from "clsx"
import {
  EntryType,
  Pattern,
  PatternClass,
  TenureType,
} from "@/app/utils/sanity/types"
import { A } from "@/app/utils/fp"
import { PatternIcon } from "../PatternIcon"
import { toggleSidebar, useStore } from "@/app/utils/store"

const Chevvy = (props: any) => (
  <div className={css.chevvy} {...props}>
    <motion.div
      className="flex flex-col items-end pr-2"
      variants={{
        closed: {
          x: `${theme.spacing[10]}`,
        },
        open: {
          x: 0,
        },
      }}
    >
      {props?.open ? (
        <ChevronLeft size={24} className="mr-1" />
      ) : (
        <ChevronRight size={24} className="mr-1" />
      )}
    </motion.div>
  </div>
)

const ToggleAllEntries = () => {
  const [checked, setChecked] = useState(false)
  const selection = useSelection()

  useEffect(() => {
    setChecked(isSelectionEmpty())
  }, [selection])

  return (
    <>
      <label
        className="flex justify-between items-center bg-white cursor-pointer pr-2 py-2"
        htmlFor="toggleAllEntries"
      >
        <div className="ml-2">
          <p>All entries</p>
        </div>
        {checked ? (
          <RadioButtonChecked
            size={24}
            className={css.checkbox}
            role="checkbox"
            aria-checked="true"
          />
        ) : (
          <RadioButton
            size={24}
            className={css.checkbox}
            role="checkbox"
            aria-checked="false"
          />
        )}
      </label>
      <input
        id="toggleAllEntries"
        type="checkbox"
        className="hidden"
        onChange={deselectAll}
        checked={checked}
      />
    </>
  )
}

const EntryTypeAccordion = () => {
  const { entryType: selectedEntryType } = useSelection()

  const entryTypeData: EntryType[] = [
    { title: "Innovative", value: "innovative" },
    { title: "Typical", value: "typical" },
    { title: "Historical", value: "historical" },
  ]

  const handleEntryTypeChange = (
    e: ChangeEvent<HTMLInputElement>,
    data: EntryFilterData
  ) => {
    const entryType = data as EntryType
    e.target.checked ? selectEntryType(entryType) : deselectEntryType()
  }

  const getEntryTypeIcon = (entryType: EntryType) => (
    <div
      className={clsx("rounded-full block h-5 w-5", {
        "bg-black": entryType.value === "typical",
        "bg-gray-300": entryType.value === "historical",
        "border-black border-2": entryType.value === "innovative",
      })}
    ></div>
  )

  return (
    <Accordion
      group={{
        name: "Entry types",
        color: "white",
      }}
      itemChange={handleEntryTypeChange}
      items={pipe(
        entryTypeData,
        A.map((entryType) => {
          return {
            checked: selectedEntryType === entryType.value,
            _id: entryType.value,
            displayText: entryType.title,
            data: entryType,
            icon: getEntryTypeIcon(entryType),
          }
        })
      )}
    />
  )
}

const TenureTypeAccordion = () => {
  const { tenureTypes } = useSelection()

  const getTenureTypeIcon = (tenureType: TenureType) => (
    <div className="text-base sm:text-lg w-5">{tenureType.substring(0, 2)}</div>
  )

  const tenureTypeData: AccordionItemData[] = Object.values(TenureType).map(
    (tenureType) => ({
      _id: tenureType,
      checked: tenureTypes.includes(tenureType),
      data: tenureType,
      displayText: tenureType,
      icon: getTenureTypeIcon(tenureType),
    })
  )

  const handleTenureTypeChange = (
    e: ChangeEvent<HTMLInputElement>,
    data: EntryFilterData
  ) => {
    const tenureType = data as TenureType
    e.target.checked
      ? selectTenureType(tenureType)
      : deselectTenureType(tenureType)
  }

  return (
    <Accordion
      group={{
        name: "Models",
        color: "#DBDBDB",
      }}
      itemChange={handleTenureTypeChange}
      items={tenureTypeData}
    />
  )
}
type Props = {
  patterns: Pattern[]
  patternClasses: PatternClass[]
}

const PatternClassAccordion = ({ patterns, patternClasses }: Props) => {
  const { patternNames } = useSelection()

  const handlePatternChange = (
    e: ChangeEvent<HTMLInputElement>,
    data: EntryFilterData
  ) => {
    const pattern = data as Pattern
    e.target.checked ? selectPattern(pattern) : deselectPattern(pattern)
  }

  const buildAccordionItemData = (pattern: Pattern): AccordionItemData => {
    return {
      checked: patternNames.includes(pattern.name),
      _id: pattern._id,
      displayText: pattern.name,
      data: pattern,
      icon: <PatternIcon size={32} pattern={pattern} className="mr-4" />,
    }
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
              color: patternClass.color.hex,
            }}
            itemChange={handlePatternChange}
            items={pipe(
              patterns,
              A.filter((pattern) => pattern.class.name === patternClass.name),
              A.map(buildAccordionItemData)
            )}
          />
        ))
      )}
    </>
  )
}

const SidebarClientComponent = ({ patterns, patternClasses }: Props) => {
  const isOpen = useStore().isSidebarOpen
  const [overflowYAuto, setOverflowYAuto] = useState(false)

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
      className={clsx(
        css.root,
        "no-scrollbar",
        overflowYAuto && "overflow-y-auto"
      )}
      transition={{
        type: "spring",
        damping: 25,
        mass: 0.9,
        stiffness: 120,
      }}
      onAnimationStart={(e) => {
        if (!isOpen) {
          setOverflowYAuto(false)
        }
      }}
      onAnimationComplete={(e) => {
        if (isOpen) {
          setOverflowYAuto(true)
        }
      }}
    >
      <Chevvy onClick={toggleSidebar} open={isOpen} />
      <ToggleAllEntries />
      <EntryTypeAccordion />
      <TenureTypeAccordion />
      <PatternClassAccordion
        patterns={patterns}
        patternClasses={patternClasses}
      />
    </motion.div>
  )
}
export default SidebarClientComponent
