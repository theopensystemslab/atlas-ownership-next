import { trpc } from "@/lib/trpc";
import { Pattern, PatternClass } from "@/lib/types"
import clsx from "clsx";
import { Dispatch, SetStateAction, useState } from "react";
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

const Header = () => (
  <header className="bg-gray-200 px-8 pb-8">
    <h1 className="text-5xl mt-8 mb-8">Explore the patterns</h1>
    <h2 className="text-2xl mb-2">What is ownership?</h2>
    <p className="mb-8">Property is often described as a &quot;bundle&quot; of rights and obligations. We can unbundle these rights into 8 classes.</p>
    <h2 className="text-2xl mb-2">What is a pattern?</h2>
    <p>A pattern is a recurring solution. Although the precise details and the legal mechanisms used may vary in each case, by identifying these common patterns we can build a kind of &quot;genome&quot; for property; a library of building blocks that can be used to describe any form of ownership or tenure. Together, we are discovering new patterns all the time, as new entries are added to the Atlas.</p>
  </header>
);

const PatternNav = (props: { patternClasses: PatternClass[] | undefined, onClick: Dispatch<SetStateAction<PatternClass | undefined>>, selectedPatternClass: PatternClass | undefined }) => (
  <nav className="columns-9 h-10 gap-0">
    {props.patternClasses && props.patternClasses.map(patternClass =>
      <button
        key={patternClass.name}
        className={`block w-full h-full text-left pl-2 text-sm hover:underline ${patternClass.name === props.selectedPatternClass?.name ? "bg-white" : patternClassLookup[patternClass.name]}`}
        onClick={() => props.onClick(patternClass)}
      >
        {patternClass.name}
      </button>
    )}
  </nav>
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
      <div className={clsx(`w-1/2 ${patternClassLookup[patternClassName!]} bg-opacity-40 flex items-center justify-center`)}>
        <PatternIcon pattern={pattern} className="w-1/4 flex justify-center" size={32} />
        <div className="p-4 w-3/4">
          <p className="text-lg">{pattern.name}</p>
          <p className="text-xs">{pattern.description}</p>
        </div>
      </div>
      <div className="w-1/2 grid" style={{ gridTemplateColumns: `repeat(${highestCount}, minmax(0, 1fr))`, direction: reverse ? "rtl" : "ltr" }}>
        <div className={clsx(`${patternClassLookup[patternClassName!]} bg-opacity-20 flex justify-center flex-col py-2 px-4`)} style={{ gridColumn: `span ${pattern.entryCount}` }}>
          <p className="text-xs">Appears in</p>
          <p className="text-5xl py-2">{pattern.entryCount}</p>
          <p className="text-xs">{pattern?.entryCount || 0 > 1 ? "entries" : "entry"}</p>
        </div>
      </div>
    </div>
  )
}

export const PatternsLayout = (props: PatternsLayoutProps) => {
  const { patternClasses } = props;
  const [selectedPatternClass, setSelectedPatternClass] = useState<PatternClass | undefined>(patternClasses?.[0]);

  return (
    <div className="bg-gray-200 text-black z-20 fixed inset-0 overflow-y-auto">
      <PageNavbar variant="light" />
      <Header />
      <PatternNav patternClasses={patternClasses} onClick={setSelectedPatternClass} selectedPatternClass={selectedPatternClass} />
      <PatternList patternClass={selectedPatternClass} />
    </div>
  )
}
