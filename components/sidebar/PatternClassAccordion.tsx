import { pipe } from "fp-ts/lib/function"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { A } from "../../lib/fp"
import { Pattern, PatternClass } from "../../lib/types"
import PatternClassAccordionPattern from "./PatternClassAccordionPattern"

type Props = {
  patternClass: PatternClass
  patterns: Pattern[]
}

const PatternClassAccordion = (props: Props) => {
  const {
    patternClass: {
      color: { hex },
      name,
    },
    patterns,
  } = props
  const [isOpen, setOpen] = useState(false)

  return (
    <div style={{ backgroundColor: hex }} className="w-64">
      <motion.header
        className="h-8"
        initial={false}
        onClick={() => setOpen(!isOpen)}
      >
        {name}
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
            {pipe(
              patterns,
              A.map((pattern) => (
                <PatternClassAccordionPattern
                  key={pattern._id}
                  pattern={pattern}
                />
              ))
            )}
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  )
}

export default PatternClassAccordion
