import { pipe } from "fp-ts/lib/function"
import { motion, AnimatePresence } from "framer-motion"
import React, { Fragment, useState } from "react"
import { A } from "../lib/fp"
import { Pattern, PatternClass } from "../lib/types"

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
                <div
                  className="overflow-hidden text-ellipsis w-full whitespace-nowrap"
                  key={pattern.name}
                >
                  {pattern.name}
                </div>
              ))
            )}
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  )
}

export default PatternClassAccordion
