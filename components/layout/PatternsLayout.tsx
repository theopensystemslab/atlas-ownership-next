import { Pattern, PatternClass } from "@/lib/types"
import { Dispatch, SetStateAction, useState } from "react";

interface PatternsLayoutProps {
  patterns?: Pattern[]
  patternClasses?: PatternClass[]
}

const patternClassLookup: Record<string, string> = {
  Rent : "bg-rent",
  Transfer: "bg-transfer",
  Administration: "bg-administration",
  Eligibility: "bg-eligibility",
  "Security of tenure": "bg-security",
  Develop: "bg-develop",
  Stewardship: "bg-stewardship",
  Use : "bg-use",
} as const;

const Header = () => (
  <header className="bg-slate-50 p-8">
    <h1 className="text-5xl mt-8 mb-8">Explore the patterns</h1>
    <h2 className="text-2xl mb-2">What is ownership?</h2>
    <p className="mb-8">Property is often described as a &quot;bundle&quot; of rights and obligations. We can unbundle these rights into 8 classes.</p>
    <h2 className="text-2xl mb-2">What is a pattern?</h2>
    <p>A pattern is a recurring solution. Although the precise details and the legal mechanisms used may vary in each case, by identifying these common patterns we can build a kind of &quot;genome&quot; for property; a library of building blocks that can be used to describe any form of ownership or tenure. Together, we are discovering new patterns all the time, as new entries are added to the Atlas.</p>
  </header>
);

const PatternNav = (props: { patternClasses: PatternClass[] | undefined, onClick: Dispatch<SetStateAction<PatternClass | undefined>> }) => (
  <nav className="columns-8 h-10 gap-0">
    {props.patternClasses && props.patternClasses.map(patternClass => 
      <button 
        key={patternClass.name} 
        className={`block w-full h-full text-left pl-2 text-sm ${patternClassLookup[patternClass.name]}`}
        onClick={() => props.onClick(patternClass)}
        >
          {patternClass.name}
        </button>
    )}
  </nav>
);

const PatternInfo = (props: { patternClass: PatternClass | undefined, patterns: Pattern[] | undefined }) => {
 const { patternClass, patterns } = props;
 return (
  <section className="p-8">
    <p>{patternClass?.description}</p>
  </section>
 )
}

export const PatternsLayout = (props: PatternsLayoutProps) => {
  const { patterns, patternClasses } = props;
  const [ selectedPatternClass, setSelectedPatternClass ] = useState<PatternClass | undefined>(patternClasses?.[0]);

  return (
    <div className="bg-white z-20 fixed inset-0">
      <Header/>
      <PatternNav patternClasses={patternClasses} onClick={setSelectedPatternClass} />
      <PatternInfo patternClass={selectedPatternClass} patterns={patterns} />
    </div>
  )
}
