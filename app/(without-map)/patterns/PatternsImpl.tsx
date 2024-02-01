"use client"
import "client-only"
import { pageComponents } from "@/app/ui/ContentPage"
import { PageNavbar } from "@/app/ui/PageNavbar"
import { PatternIcon } from "@/app/ui/PatternIcon"
import {
  Page,
  Pattern,
  PatternClass,
  PatternInfo,
} from "@/app/utils/sanity/types"
import { PortableText } from "@portabletext/react"
import clsx from "clsx"
import { Dispatch, SetStateAction, useEffect, useState } from "react"

type Props = {
  patternClasses?: PatternClass[]
  patternsPageData?: Page
  patternInfoList?: PatternInfo[]
}

const patternClassLookup: Record<string, string> = {
  Rent: "bg-rent",
  Access: "bg-access",
  Transfer: "bg-transfer",
  Administration: "bg-administration",
  Eligibility: "bg-eligibility",
  "Security of tenure": "bg-security",
  Develop: "bg-develop",
  Stewardship: "bg-stewardship",
  Use: "bg-use",
} as const

interface HeaderProps {
  page?: Page
}

const Header = ({ page }: HeaderProps) => (
  <header className="bg-gray-200 px-8 pb-6 text-black">
    <h1
      className="mt-8 mb-8"
      style={{
        fontSize: "50px",
        lineHeight: "52.5px",
        letterSpacing: "-0.03em",
      }}
    >
      {page?.title}
    </h1>
    <PortableText value={page?.content} components={pageComponents} />
  </header>
)

interface PatternNavProps {
  patternClasses: PatternClass[] | undefined
  onClick: Dispatch<SetStateAction<PatternClass | undefined>>
  selectedPatternClass: PatternClass | undefined
}

const PatternNav = ({
  patternClasses,
  onClick,
  selectedPatternClass,
}: PatternNavProps) => (
  <>
    <nav className="columns-8 h-10 gap-0 hidden lg:block">
      {patternClasses &&
        patternClasses.map((patternClass) => (
          <button
            key={patternClass.name}
            className={`block w-full h-full text-left pl-2 text-sm hover:underline ${
              patternClass.name === selectedPatternClass?.name
                ? "bg-white"
                : patternClassLookup[patternClass.name]
            }`}
            onClick={() => onClick(patternClass)}
          >
            {patternClass.name}
          </button>
        ))}
    </nav>
    <nav
      className={`px-8 lg:hidden w-full flex gap-4 flex-wrap justify-around items-center py-4 ${
        selectedPatternClass
          ? patternClassLookup[selectedPatternClass?.name]
          : patternClassLookup[0]
      }`}
    >
      <label className="md:text-lg" htmlFor="patternsClassSelect">
        Explore a pattern class:
      </label>
      <select
        name="patternsClassSelect"
        id="patternsClassSelect"
        className="px-4 py-2"
        onChange={(e) => {
          onClick(patternClasses && patternClasses[Number(e.target.value)])
        }}
      >
        {patternClasses &&
          patternClasses.map((patternClass, i) => (
            <option key={`${patternClass.name}-option`} value={i}>
              {patternClass.name}
            </option>
          ))}
      </select>
    </nav>
  </>
)

const PatternList = (props: {
  patternClass: PatternClass | undefined
  patternInfoList: PatternInfo[] | undefined
}) => {
  const { patternClass, patternInfoList } = props
  const patternInfo = patternInfoList?.find(
    (patternInfo) => patternInfo.name === patternClass?.name
  )

  return (
    <section className="p-8 bg-white">
      <p className="mb-4 text-lg">{patternClass?.description}</p>
      <h3 className="text-lg mb-4 font-semibold">Rights</h3>
      {patternInfo?.rights.map((pattern, i) => (
        <PatternItem
          key={`${pattern.name}-${i}`}
          pattern={pattern}
          patternClassName={patternClass?.name}
          highestCount={patternInfo?.rights[0].entryCount}
        />
      ))}
      <h3 className="text-lg mb-4 font-semibold">Obligations</h3>
      {patternInfo?.obligations.map((pattern, i) => (
        <PatternItem
          key={`${pattern.name}-${i}`}
          pattern={pattern}
          patternClassName={patternClass?.name}
          reverse
          highestCount={patternInfo?.obligations[0].entryCount}
        />
      ))}
    </section>
  )
}

const PatternItem = (props: {
  pattern: Pattern
  patternClassName: string | undefined
  reverse?: boolean
  highestCount: number | undefined
}) => {
  const { pattern, patternClassName, reverse, highestCount } = props

  return (
    <div className={`flex mb-4 ${reverse ? "flex-row-reverse" : ""}`}>
      <div
        className={clsx(
          `w-full md:w-1/2 ${
            patternClassLookup[patternClassName!]
          } bg-opacity-40 flex items-center justify-center`
        )}
      >
        <PatternIcon
          pattern={pattern}
          className="w-1/4 flex justify-center"
          size={32}
        />
        <div className="p-4 w-3/4">
          <p className="text-lg">{pattern.name}</p>
          <p className="text-xs">{pattern.description}</p>
        </div>
      </div>
      <div
        className="md:w-1/2 md:grid w-1/4"
        style={{
          gridTemplateColumns: `repeat(${highestCount}, minmax(0, 1fr))`,
          direction: reverse ? "rtl" : "ltr",
        }}
      >
        <div
          className={clsx(
            `${
              patternClassLookup[patternClassName!]
            } bg-opacity-20 flex justify-center flex-col py-2 px-4 h-full`
          )}
          style={{ gridColumn: `span ${pattern.entryCount}` }}
        >
          <p className="text-center md:text-start text-xs">Appears in</p>
          <p className="text-center md:text-start text-5xl py-2">
            {pattern.entryCount}
          </p>
          <p className="text-center md:text-start text-xs">
            {pattern?.entryCount || 0 > 1 ? "entries" : "entry"}
          </p>
        </div>
      </div>
    </div>
  )
}

const PatternsImpl = (props: Props) => {
  const { patternClasses, patternsPageData, patternInfoList } = props
  const [selectedPatternClass, setSelectedPatternClass] = useState<
    PatternClass | undefined
  >(patternClasses?.[0])

  useEffect(() => {
    setSelectedPatternClass(patternClasses?.[0])
  }, [patternClasses])

  return (
    <div className="bg-gray-200 text-black z-20 fixed inset-0 overflow-y-auto">
      <PageNavbar variant="light" />
      <Header page={patternsPageData} />
      <PatternNav
        patternClasses={patternClasses}
        onClick={setSelectedPatternClass}
        selectedPatternClass={selectedPatternClass}
      />
      <PatternList
        patternClass={selectedPatternClass}
        patternInfoList={patternInfoList}
      />
    </div>
  )
}

export default PatternsImpl
