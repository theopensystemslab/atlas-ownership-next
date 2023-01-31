import { trpc } from "@/lib/trpc";
import { Page, Pattern, PatternClass } from "@/lib/types"
import { PortableText } from "@portabletext/react";
import clsx from "clsx";
import { Dispatch, SetStateAction, useState } from "react";
import { pageComponents } from "../ContentPage";
import { PageNavbar } from "../PageNavbar";
import { PatternIcon } from "./ui/PatternIcon";

interface PatternsLayoutProps {
  patternClasses?: PatternClass[]
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
} as const;

interface HeaderProps {
  page?: Page
}

const Header = ({ page }: HeaderProps) => (
  <header className="bg-gray-200 px-8 pb-6 text-black">
    <h1 className="text-5xl mt-8 mb-8">{page?.title}</h1>
    <PortableText
      value={page?.content}
      components={pageComponents}
    />
  </header>
);

interface PatternNavProps {
  patternClasses: PatternClass[] | undefined
  onClick: Dispatch<SetStateAction<PatternClass | undefined>>
  selectedPatternClass: PatternClass | undefined
}

const PatternNav = ({ patternClasses, onClick, selectedPatternClass }: PatternNavProps) => (
  <>
    <nav className="columns-9 h-10 gap-0 hidden lg:block">
      {patternClasses && patternClasses.map(patternClass =>
        <button
        key={patternClass.name}
        className={`block w-full h-full text-left pl-2 text-sm hover:underline ${patternClass.name === selectedPatternClass?.name ? "bg-white" : patternClassLookup[patternClass.name]}`}
        onClick={() => onClick(patternClass)}
        >
          {patternClass.name}
        </button>
      )}
    </nav>
    <nav className={`px-8 lg:hidden w-full flex gap-4 flex-wrap justify-around items-center py-4 ${selectedPatternClass ? patternClassLookup[selectedPatternClass?.name] : patternClassLookup[0]}`}>
      <label className="md:text-lg" htmlFor="patternsClassSelect">Explore a pattern class:</label>
      <select 
        name="patternsClassSelect" 
        id="patternsClassSelect" 
        className="px-4 py-2"
        onChange={(e) => {
          onClick(patternClasses && patternClasses[Number(e.target.value)])
        }}
      >
        {patternClasses && patternClasses.map((patternClass, i) =>
          <option key={`${patternClass.name}-option`} value={i}>{patternClass.name}</option>
        )}
      </select>
    </nav>
  </>
);

const PatternList = (props: { patternClass: PatternClass | undefined }) => {
  const { patternClass } = props;
  const { data: patternInfo, error: patternInfoError } = trpc.patternInfo.useQuery({ patternClassName: patternClass?.name || null })
  return (
    <section className="p-8 bg-white">
      <p className="mb-4">{patternClass?.description}</p>
      <h3 className="text-lg mb-4">Rights</h3>
      {patternInfo?.rights.map((pattern, i) => (
        <PatternItem key={`${pattern.name}-${i}`} pattern={pattern} patternClassName={patternClass?.name} highestCount={patternInfo?.rights[0].entryCount} />
      ))}
      <h3 className="text-lg mb-4">Obligations</h3>
      {patternInfo?.obligations.map((pattern, i) => (
        <PatternItem key={`${pattern.name}-${i}`} pattern={pattern} patternClassName={patternClass?.name} reverse highestCount={patternInfo?.obligations[0].entryCount} />
      ))}
    </section>
  )
}

const PatternItem = (props: { pattern: Pattern, patternClassName: string | undefined, reverse?: boolean, highestCount: number | undefined }) => {
  const { pattern, patternClassName, reverse, highestCount } = props

  return (
    <div className={`flex mb-4 ${reverse ? "flex-row-reverse" : ""}`}>
      <div className={clsx(`w-full md:w-1/2 ${patternClassLookup[patternClassName!]} bg-opacity-40 flex items-center justify-center`)}>
        <PatternIcon pattern={pattern} className="w-1/4 flex justify-center" size={32} />
        <div className="p-4 w-3/4">
          <p className="text-lg">{pattern.name}</p>
          <p className="text-xs">{pattern.description}</p>
        </div>
      </div>
      <div className="md:w-1/2 md:grid w-1/4" style={{ gridTemplateColumns: `repeat(${highestCount}, minmax(0, 1fr))`, direction: reverse ? "rtl" : "ltr" }}>
        <div className={clsx(`${patternClassLookup[patternClassName!]} bg-opacity-20 flex justify-center flex-col py-2 px-4 h-full`)} style={{ gridColumn: `span ${pattern.entryCount}` }}>
          <p className="text-center md:text-start text-xs">Appears in</p>
          <p className="text-center md:text-start text-5xl py-2">{pattern.entryCount}</p>
          <p className="text-center md:text-start text-xs">{pattern?.entryCount || 0 > 1 ? "entries" : "entry"}</p>
        </div>
      </div>
    </div>
  )
}

export const PatternsLayout = (props: PatternsLayoutProps) => {
  const { data: patternsPage } = trpc.page.useQuery({ pageSlug: "patterns" })
  const { patternClasses } = props;
  const [selectedPatternClass, setSelectedPatternClass] = useState<PatternClass | undefined>(patternClasses?.[0]);

  return (
    <div className="bg-gray-200 text-black z-20 fixed inset-0 overflow-y-auto">
      <PageNavbar variant="light" />
      <Header page={patternsPage}/>
      <PatternNav patternClasses={patternClasses} onClick={setSelectedPatternClass} selectedPatternClass={selectedPatternClass} />
      <PatternList patternClass={selectedPatternClass} />
    </div>
  )
}
