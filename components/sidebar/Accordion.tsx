import css from "./Accordion.module.css"
import { pipe } from "fp-ts/lib/function"
import { AnimatePresence, motion } from "framer-motion"
import { ChangeEvent, useState } from "react"
import { A } from "../../lib/fp"
import AccordionItem from "./AccordionItem"
import { ChevronDown, ChevronUp } from "@carbon/icons-react"
import { EntryType, Pattern, TenureType } from "@/lib/types"

interface AccordionGroup {
  color: string
  name: string
  description?: string
}

export interface AccordionItemData {
  _id: string
  checked: boolean
  displayText: string
  data: EntryFilterData
}

export type EntryFilterData = Pattern | EntryType | TenureType

type Props = {
  group: AccordionGroup
  items: AccordionItemData[]
  itemChange: (e: ChangeEvent<HTMLInputElement>, data: EntryFilterData) => void
}

const Accordion = (props: Props) => {
  const {
    group: {
      color,
      name,
      description
    },
    items,
    itemChange,
  } = props
  const [isOpen, setOpen] = useState(false)

  return (
    <div style={{ backgroundColor: color }} className={css.root}>
      <motion.header
        className={css.header}
        initial={false}
        onClick={() => setOpen(!isOpen)}
      >
        {name}
        {isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
      </motion.header>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.section
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            {description  && <p className="text-xs mt-2 mb-4">{description}</p>}
            {pipe(
              items,
              A.map((item) => (
                <AccordionItem
                  key={item._id}
                  id={item._id}
                  data={item.data}
                  handleChange={itemChange}
                  checked={item.checked}
                  displayText={item.displayText}
                />
              ))
            )}
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Accordion
