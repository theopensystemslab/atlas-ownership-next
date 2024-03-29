import { trpc } from "@/lib/trpc"
import { ChevronUp } from "@carbon/icons-react"
import clsx from "clsx"
import _ from "lodash"
import { useState } from "react"
import { PatternClass, Term } from "../lib/types"
import { Carousel } from "./carousel/Carousel"
import { PatternIcon } from "./layout/ui/PatternIcon"
import { Tag } from "./layout/ui/Tag"

// TODO: Move to style utils
// maps patternClass.name to custom color keys defined in tailwind.config.js
//  tailwind doesn't support templated class names, hence we need to use this lookup
const backgroundColorClasses: any = {
  "Rent": "bg-rent",
  "Transfer": "bg-transfer",
  "Administration": "bg-administration",
  "Eligibility": "bg-eligibility",
  "Security of tenure": "bg-security",
  "Develop": "bg-develop",
  "Stewardship": "bg-stewardship",
  "Use": "bg-use",
  "Access": "bg-access",
};

const hoverColorClasses: any = {
  "Rent": "hover:bg-rent/70",
  "Transfer": "hover:bg-transfer/70",
  "Administration": "hover:bg-administration/70",
  "Eligibility": "hover:bg-eligibility/70",
  "Security of tenure": "hover:bg-security/70",
  "Develop": "hover:bg-develop/70",
  "Stewardship": "hover:bg-stewardship/70",
  "Use": "hover:bg-use/70",
  "Access": "hover:bg-access/70",
};

const descriptionBackgroundColorClasses: any = {
  "Rent": "bg-rent/20",
  "Transfer": "bg-transfer/20",
  "Administration": "bg-administration/20",
  "Eligibility": "bg-eligibility/20",
  "Security of tenure": "bg-security/20",
  "Develop": "bg-develop/20",
  "Stewardship": "bg-stewardship/20",
  "Use": "bg-use/20",
  "Access": "bg-access/20",
};


type Props = {
  rollupToPatternClass: boolean,
  showLabels: boolean,
  terms?: Term[]
  entryId?: string;
}

interface PatternClassTotal {
  name: string | undefined
  meta: PatternClass | undefined
  avgObligations: number
  avgRights: number
}

interface DataRowProps {
  patternClassTotal: PatternClassTotal
  showLabels: boolean
}

interface ExpandableRowProps {
  term?: any
  entryId?: string
  onClick: () => void
}

interface BarChartByPatternClassProps {
  data: PatternClassTotal[]
  showLabels: boolean
}

interface ExpandableBarChartByPatternProps {
  data: any
  entryId: string | undefined
  showLabels: boolean
}

const DataRow = (props: DataRowProps) => {
  const { patternClassTotal: patternClass, showLabels } = props

  return (
    <div className="flex">
      {showLabels ? (
        <div className="w-1/5 h-10 text-black text-sx sm:text-sm text-right flex items-center justify-end mr-3">
          {patternClass.name}
        </div> 
      ) : (``)}
      <div className="flex-1 grid border-r-white border-r-2" style={{ gridTemplateColumns: `repeat(5, minmax(0, 1fr))`, direction: "rtl"}}>
        <div className={`${patternClass.avgObligations > 0 && backgroundColorClasses[patternClass.name!]} h-10`} style={{ gridColumn: `span ${patternClass.avgObligations}` }}>
        </div>
      </div>
      <div className="flex-1 grid" style={{ gridTemplateColumns: `repeat(5, minmax(0, 1fr))`, direction: "ltr" }}>
        <div className={`${patternClass.avgRights > 0 && backgroundColorClasses[patternClass.name!]} h-10`} style={{ gridColumn: `span ${patternClass.avgRights}` }}>
        </div>
      </div>
    </div>
  )
}

const ExpandableRow = (props: ExpandableRowProps) => {
  const { term, onClick, entryId } = props
  const { data: carouselItems, error: carouselItemsError } = trpc.entriesByPatternId.useQuery({ patternId: term.meta._id, entryId })
  const showCarousel = carouselItems && carouselItems.length > 0

  return (
    <div
      className={`flex flex-col h-fit w-full text-black ${term.patternClassName ? descriptionBackgroundColorClasses[term.patternClassName] : 'bg-gray-200'} cursor-pointer`}
      id="row-expandable-description"
      onClick={onClick}
    >
      <div className="px-4 pb-4">
        <div className="flex justify-between items-start mb-4">
          <PatternIcon className="mt-4" size="32" pattern={{ iconUrl: term.patternIconUrl }}/>
          <div className="flex justify-between items-center">
            <ChevronUp size={32} className={`${backgroundColorClasses[term.patternClassName]} bg-opacity-20 h-10 w-10 p-2`}/>
            <p className="text-xs sm:text-sm text-right pl-4">{term.patternClassName} {term.type.toLowerCase()}</p>
          </div>
        </div>
        <h2 className="text-base sm:text-lg">{term.name}</h2>
        <p className="text-xs sm:text-sm mb-2 sm:mb-4">{term.meta?.description}</p>
        {term?.description && (
          <div>
            <h3>How it applies here</h3>
            <p className="text-xs sm:text-sm">{term?.description}</p>
          </div>
        )}
        {term?.legalMechanisms && (
          <div className="mt-4 flex gap-4">
            {term.legalMechanisms.map((mechanism: string) => <Tag key={mechanism} className={`${backgroundColorClasses[term.patternClassName]} bg-opacity-20`}>{mechanism}</Tag>)}
          </div>
        )}
      </div>
      {showCarousel && <Carousel data={carouselItems} title="Other places that use this pattern" cardClassNames={clsx(`${backgroundColorClasses[term.patternClassName]} bg-opacity-20`)} />}
    </div>
  )
}

const BarChartByPatternClass = (props: BarChartByPatternClassProps) => {
  const { data: totalsByPatternClass, showLabels } = props

  return (
    <div className="mt-4">
      <div className="flex">
        {showLabels ? <div className="w-1/5 h-10"></div> : ``}
        <div className="flex-1 h-10 text-base text-center text-gray-500">Obligations</div>
        <div className="flex-1 h-10 text-base text-center text-gray-500">Rights</div>
      </div>
      {totalsByPatternClass.map(patternClass => (
        <DataRow patternClassTotal={patternClass} showLabels={showLabels} key={`data-row-${patternClass.name}`} />
      ))}
    </div>
  )
}

const ExpandableBarChartByPattern = (props: ExpandableBarChartByPatternProps) => {
  const { data: formattedTerms, entryId, showLabels } = props
  const gridCols = showLabels ? 8 : 5

  const [openIndex, setOpenIndex] = useState<number | undefined>(undefined)

  const handleClick = (i: number) => {
    i === openIndex ? setOpenIndex(undefined) : setOpenIndex(i)
  }

  return (
    <div className="m-8">
      <div className="flex">
        <div className="flex-1 h-10 text-base sm:text-lg text-center text-black">Obligations</div>
        <div className="flex-1 h-10 text-base sm:text-lg text-center text-black">Rights</div>
      </div>
      {formattedTerms.map((term: any, i: number) => (
        <div className="flex flex-col" key={`row-${term.name}-${i}`}>
          <div className="flex">
            <div className="flex-1 grid" style={{ gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`, direction: "rtl"}}>
              <div 
                className={`${term.type === "Obligation" && term.strength > 0 && backgroundColorClasses[term.patternClassName!]} ${term.type === "Obligation" && hoverColorClasses[term.patternClassName!]} h-10 cursor-pointer flex justify-end items-center`} 
                style={{ gridColumn: `span ${term.strength || 1}` }}
                onClick={() => handleClick(i)}
              >
                {term.type === "Obligation" && <PatternIcon size="24" className="ml-2 text-black" pattern={{ iconUrl: term.patternIconUrl }}/>}
              </div>
              {showLabels &&
                <div className="flex-1 h-10 text-black text-xs sm:text-sm flex items-center mr-3 text-right" style={{ gridColumn: showLabels ? `span ${term.strength ? 8 - term.strength : 7}` : `span ${term.strength ? 5 - term.strength : 4}` }}>
                  {term.type === "Obligation" && term.name}
                </div>
              }
            </div>
            <div className="flex-1 grid" style={{ gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`, direction: "ltr" }}>
              <div 
                className={`${term.type === "Right" && term.strength > 0 && backgroundColorClasses[term.patternClassName!]} ${term.type === "Right" && hoverColorClasses[term.patternClassName!]} h-10 cursor-pointer flex justify-end items-center`} 
                style={{ gridColumn: `span ${term.strength || 1}` }}
                onClick={() => handleClick(i)}
              >
                {term.type === "Right" && <PatternIcon size="24" className="mr-2 text-black" pattern={{ iconUrl: term.patternIconUrl }} />}
              </div>
            {showLabels &&
                <div className="flex-1 h-10 text-black text-xs sm:text-sm flex items-center justify-start ml-3" style={{ gridColumn: showLabels ? `span ${term.strength ? 8 - term.strength : 7}` : `span ${term.strength ? 5 - term.strength : 4}` }}>
                {term.type === "Right" && term.name}
              </div> 
            }
            </div>
          </div>
          {openIndex === i && <ExpandableRow term={term} onClick={() => setOpenIndex(undefined)} entryId={entryId} />}
        </div>
      ))}
    </div>
  )
}

const Chart = (props: Props) => {
  const { rollupToPatternClass, showLabels, terms = [], entryId } = props;

  const { data: patterns, error: patternsError } = trpc.patterns.useQuery()
  const { data: patternClasses, error: patternClassesError } =
    trpc.patternClasses.useQuery()
  
  // Format the list of individual terms that apply to this entry
  let formattedTerms = _(terms)
    .map((term: any) => ({
      pattern: _.find(patterns, ['_id', term.pattern?._ref]),
      patternName: _.find(patterns, ['_id', term.pattern?._ref])?.name,
      type: _.capitalize(_.find(patterns, ['_id', term.pattern?._ref])?.type),
      strength: term.strength, // 1-5
      description: term.description,
      legalMechanisms: term.termLegalMechanisms?.map((mechanism: Record<string, any>) => mechanism.name),
    }))
    .map((term: any) => ({
      meta: term.pattern,
      name: term.patternName,
      patternClassName: _.find(patternClasses, ['_id', term.pattern?.class?._ref])?.name,
      patternClassOrder: _.find(patternClasses, ['_id', term.pattern?.class?._ref])?.order,
      patternIconUrl: term.pattern?.iconUrl,
      type: term.type === "Limitation" ? "Obligation" : term.type,
      strength: term.strength,
      description: term.description,
      legalMechanisms: term.legalMechanisms
    }))
    .sortBy('patternClassOrder', 'name')
    .value();

  // Rollup the individual terms by their pattern class
  let totalsByPatternClass = _(formattedTerms)
    .groupBy('patternClassName')
    .map((terms: any) => ({
      terms: terms,
      meta: _.find(patternClasses, ['_id', terms[0].meta?.class._ref]),
      name: terms[0].patternClassName,
      avgRights: _(terms).filter({ type: "Right" }).meanBy("strength"),
      avgObligations: _(terms).filter({ type: "Obligation" }).meanBy("strength"),
    }))
    .sortBy('meta.order')
    .value();

  // Ensure totalsByPatternClass has an entry for **every** pattern class, insert one if it doesn't
  // if (totalsByPatternClass.length !== patternClasses?.length) {
  //   patternClasses?.forEach(globalPatternClass => {
  //     if (!_.find(totalsByPatternClass, ['name', globalPatternClass.name])) {
  //       totalsByPatternClass.push({
  //         terms: [],
  //         meta: globalPatternClass,
  //         name: globalPatternClass.name,
  //         avgRights: 0,
  //         avgObligations: 0,
  //       });
  //     }
  //   });
  // }

  // Replace any NaNs with 0, round to nearest integer, and do a final sort
  totalsByPatternClass = _(totalsByPatternClass)
    .map((patternClass: any) => ({
      terms: patternClass.terms,
      meta: patternClass.meta,
      name: patternClass.name,
      avgRights: patternClass.avgRights > 0 ? _.round(patternClass.avgRights) : 0,
      avgObligations: patternClass.avgObligations > 0 ? _.round(patternClass.avgObligations) : 0,
    }))
    .sortBy('meta.order')
    .value();

  return rollupToPatternClass ? (
    <BarChartByPatternClass data={totalsByPatternClass} showLabels={showLabels} />
  ) : (
    <ExpandableBarChartByPattern data={formattedTerms} entryId={entryId} showLabels={showLabels} />
  );
}

export default Chart
