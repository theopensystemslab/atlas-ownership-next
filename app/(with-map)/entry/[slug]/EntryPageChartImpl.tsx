"use client"
import { useWindowDimensions } from "@/app/utils/dom"
import { ChevronUp } from "@carbon/icons-react"
import "client-only"
import clsx from "clsx"
import { useState } from "react"
import { PatternIcon } from "../../../ui/PatternIcon"
import { Tag } from "../../../ui/Tag"
import { Carousel } from "../../../ui/carousel/Carousel"
import {
  backgroundColorClasses,
  descriptionBackgroundColorClasses,
  hoverColorClasses,
} from "../../../ui/map/markers/styles"

type Props = {
  augmentedTerms: any[]
}

const EntryPageChartImpl = (props: Props) => {
  const { augmentedTerms } = props

  const { width } = useWindowDimensions()
  const showLabels = width && width > 450 ? true : false
  const gridCols = showLabels ? 8 : 5

  const [openIndex, setOpenIndex] = useState<number | undefined>(undefined)

  const handleClick = (i: number) => {
    i === openIndex ? setOpenIndex(undefined) : setOpenIndex(i)
  }

  return (
    <div className="m-8">
      <div className="flex">
        <div className="flex-1 h-10 text-base sm:text-lg text-center text-black">
          Obligations
        </div>
        <div className="flex-1 h-10 text-base sm:text-lg text-center text-black">
          Rights
        </div>
      </div>
      {augmentedTerms.map((term: any, i: number) => (
        <div className="flex flex-col" key={`row-${term.name}-${i}`}>
          <div className="flex">
            <div
              className="flex-1 grid"
              style={{
                gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`,
                direction: "rtl",
              }}
            >
              <div
                className={`${
                  term.type === "Obligation" &&
                  term.strength > 0 &&
                  backgroundColorClasses[term.patternClassName!]
                } ${
                  term.type === "Obligation" &&
                  hoverColorClasses[term.patternClassName!]
                } h-10 cursor-pointer flex justify-end items-center`}
                style={{ gridColumn: `span ${term.strength || 1}` }}
                onClick={() => handleClick(i)}
              >
                {term.type === "Obligation" && (
                  <PatternIcon
                    size="24"
                    className="ml-2 text-black"
                    pattern={{ iconUrl: term.patternIconUrl }}
                  />
                )}
              </div>
              {showLabels && (
                <div
                  className="flex-1 h-10 text-black text-xs sm:text-sm flex items-center mr-3 text-right"
                  style={{
                    gridColumn: showLabels
                      ? `span ${term.strength ? 8 - term.strength : 7}`
                      : `span ${term.strength ? 5 - term.strength : 4}`,
                  }}
                >
                  {term.type === "Obligation" && term.name}
                </div>
              )}
            </div>
            <div
              className="flex-1 grid"
              style={{
                gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`,
                direction: "ltr",
              }}
            >
              <div
                className={`${
                  term.type === "Right" &&
                  term.strength > 0 &&
                  backgroundColorClasses[term.patternClassName!]
                } ${
                  term.type === "Right" &&
                  hoverColorClasses[term.patternClassName!]
                } h-10 cursor-pointer flex justify-end items-center`}
                style={{ gridColumn: `span ${term.strength || 1}` }}
                onClick={() => handleClick(i)}
              >
                {term.type === "Right" && (
                  <PatternIcon
                    size="24"
                    className="mr-2 text-black"
                    pattern={{ iconUrl: term.patternIconUrl }}
                  />
                )}
              </div>
              {showLabels && (
                <div
                  className="flex-1 h-10 text-black text-xs sm:text-sm flex items-center justify-start ml-3"
                  style={{
                    gridColumn: showLabels
                      ? `span ${term.strength ? 8 - term.strength : 7}`
                      : `span ${term.strength ? 5 - term.strength : 4}`,
                  }}
                >
                  {term.type === "Right" && term.name}
                </div>
              )}
            </div>
          </div>
          {openIndex === i && (
            <div
              className={`flex flex-col h-fit w-full text-black ${
                term.patternClassName
                  ? descriptionBackgroundColorClasses[term.patternClassName]
                  : "bg-gray-200"
              } cursor-pointer`}
              id="row-expandable-description"
              onClick={() => handleClick(i)}
            >
              <div className="px-4 pb-4">
                <div className="flex justify-between items-start mb-4">
                  <PatternIcon
                    className="mt-4"
                    size="32"
                    pattern={{ iconUrl: term.patternIconUrl }}
                  />
                  <div className="flex justify-between items-center">
                    <ChevronUp
                      size={32}
                      className={`${
                        backgroundColorClasses[term.patternClassName]
                      } bg-opacity-20 h-10 w-10 p-2`}
                    />
                    <p className="text-xs sm:text-sm text-right pl-4">
                      {term.patternClassName} {term.type.toLowerCase()}
                    </p>
                  </div>
                </div>
                <h2 className="text-base sm:text-lg">{term.name}</h2>
                <p className="text-xs sm:text-sm mb-2 sm:mb-4">
                  {term.meta?.description}
                </p>
                {term?.description && (
                  <div>
                    <h3>How it applies here</h3>
                    <p className="text-xs sm:text-sm">{term?.description}</p>
                  </div>
                )}
                {term?.legalMechanisms && (
                  <div className="mt-4 flex gap-4">
                    {term.legalMechanisms.map((mechanism: string) => (
                      <Tag
                        key={mechanism}
                        className={`${
                          backgroundColorClasses[term.patternClassName]
                        } bg-opacity-20`}
                      >
                        {mechanism}
                      </Tag>
                    ))}
                  </div>
                )}
              </div>
              {augmentedTerms[i].relatedEntriesByPattern.length > 0 && (
                <Carousel
                  data={augmentedTerms[i].relatedEntriesByPattern}
                  title="Other places that use this pattern"
                  cardClassNames={clsx(
                    `${
                      backgroundColorClasses[term.patternClassName]
                    } bg-opacity-20`
                  )}
                />
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default EntryPageChartImpl
