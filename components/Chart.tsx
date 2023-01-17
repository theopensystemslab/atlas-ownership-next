import { trpc } from "@/lib/trpc"
import clsx from "clsx"
import _ from "lodash"
import { useState } from "react"
import { Term } from "../lib/types"
import { Carousel } from "./carousel/Carousel"

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
  patterns?: Pattern[]
  patternClasses?: PatternClass[]
  entryId?: string;
}

interface ExpandableRowProps {
  term?: any
  entryId?: string
  onClick: () => void
}

const ExpandableRow = (props: ExpandableRowProps) => {
  const { term, onClick, entryId } = props
  const { data: carouselItems, error: carouselItemsError } = trpc.entriesByPatternId.useQuery({ patternId: term.meta._id, entryId })
  const showCarousel = carouselItems && carouselItems.length > 0

  return (
    <div
      className={`flex flex-col h-fit w-full text-gray-600 ${term.patternClassName ? descriptionBackgroundColorClasses[term.patternClassName] : 'bg-gray-200'}`}
      id="row-expandable-description"
      onClick={onClick}
    >
      <div className="p-4">
        <p className="text-xs text-right">{term.patternClassName} {term.type.toLowerCase()}</p>
        <h2 className="text-sm mb-1">{term.name}</h2>
        <p className="text-xs">{term.meta?.description}</p>
      </div>
      {showCarousel && <Carousel data={carouselItems} title="Other places that use this pattern" cardClassNames={clsx(`${backgroundColorClasses[term.patternClassName]} bg-opacity-20`)} />}
    </div>
  )
}

const Chart = (props: Props) => {
  const { rollupToPatternClass, showLabels, terms = [], entryId } = props;

  const [open, setOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState(0);

  const { data: patterns, error: patternsError } = trpc.patterns.useQuery()
  const { data: patternClasses, error: patternClassesError } =
    trpc.patternClasses.useQuery()
  // Format the list of individual terms that apply to this entry
  let formattedTerms = _(terms)
    .map((term: any) => ({
      pattern: _.find(patterns, ['_id', term.pattern?._ref]),
      patternName: _.find(patterns, ['_id', term.pattern?._ref])?.name,
      type: term.rightsIntensity > 0 ? "Right" : "Obligation", // because pattern.type is not consistently populated
      strength: term.strength, // 1-5
    }))
    .map((term: any) => ({
      meta: term.pattern,
      name: term.patternName,
      patternClassName: _.find(patternClasses, ['_id', term.pattern?.class?._ref])?.name,
      patternClassOrder: _.find(patternClasses, ['_id', term.pattern?.class?._ref])?.order,
      type: term.type,
      strength: term.strength,
    }))
    .sortBy('patternClassOrder', 'name')
    .value();

  // Group terms by pattern
  let totalsByPattern = _(terms)
    .groupBy('pattern._ref')
    .map((term: any) => ({
      pattern: _.find(patterns, ['_id', term[0].pattern._ref]),
      patternName: _.find(patterns, ['_id', term[0].pattern._ref])?.name,
      sumRights: _.sumBy(term, 'rightsIntensity'),
      sumObligations: _.sumBy(term, 'obligationIntensity')
    }))
    .value();

  // Rollup to pattern class, taking the average rights & obligations from each pattern rounded to nearest integer
  let totalsByPatternClass = _(totalsByPattern)
    .groupBy('pattern.class._ref')
    .map((pattern: any) => ({
      meta: _.find(patternClasses, ['_id', pattern[0].pattern?.class._ref]),
      name: _.find(patternClasses, ['_id', pattern[0].pattern?.class._ref])?.name,
      avgRights: _.round(_.meanBy(pattern, 'sumRights')),
      avgObligations: _.round(_.meanBy(pattern, 'sumObligations')),
    }))
    .sortBy('meta.order')
    .value();

  // Ensure totalsByPatternClass has an entry for **every** pattern class, insert one if it doesn't
  if (totalsByPatternClass.length !== patternClasses?.length) {
    patternClasses?.forEach(globalPatternClass => {
      if (!_.find(totalsByPatternClass, ['name', globalPatternClass.name])) {
        totalsByPatternClass.push({
          meta: globalPatternClass,
          name: globalPatternClass.name,
          avgRights: 0,
          avgObligations: 0,
        });
      }
    });
  }

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

  // added to match figma marker designs, but colored text doesn't look great? 
  const textColorClasses: any = {
    "Rent": "text-rent",
    "Transfer": "text-transfer",
    "Administration": "text-administration",
    "Eligibility": "text-eligibility",
    "Security of tenure": "text-security",
    "Develop": "text-develop",
    "Stewardship": "text-stewardship",
    "Use": "text-gray-400",
    "Access": "text-access",
  };

  // maps pattern.strength values (0-5) to tailwind percentage width
  //   ref https://tailwindcss.com/docs/width#percentage-widths
  const percentageWidthClasses: any = {
    "NaN": "w-0", // possible when calculating average strength (divide by zero) for charts rolled up to patternClass
    "0": "w-0",
    "1": "w-1/5",
    "2": "w-2/5",
    "3": "w-3/5",
    "4": "w-4/5",
    "5": "w-5/5", // w-full
  };

  return rollupToPatternClass ? (
    <div className="m-4" id="chart-container">
      <div className="flex" id="row-header">
        {showLabels ? <div className="flex-1 h-10"></div> : ``}
        <div className="flex-1 h-10 text-lg text-center text-gray-600">Obligations</div>
        <div className="flex-1 h-10 text-lg text-center text-gray-600">Rights</div>
      </div>
      {totalsByPatternClass.map(patternClass => (
        <div className="flex" key={`row-${patternClass.name}`}>
          {showLabels ? <div className="flex-1 h-10 text-base text-right mr-3 text-black" id="label">{patternClass.name}</div> : ``}
          <div className={`flex-1 h-10 border-r-white border-r-2 ${patternClass.name ? backgroundColorClasses[patternClass.name] : 'bg-gray-400'}`} id={`obligations-${patternClass.name}`}>
            <div className={`h-10 bg-white ${patternClass.avgObligations > 0 ? percentageWidthClasses[(5 - patternClass.avgObligations).toString()] : 'w-full'}`}></div>
          </div>
          <div className="flex-1 h-10 bg-white" id={`rights-${patternClass.name}`}>
            <div className={`h-10 ${percentageWidthClasses[patternClass.avgRights.toString()]} ${patternClass.name ? backgroundColorClasses[patternClass.name] : 'bg-gray-400'}`}></div>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className="m-4" id="chart-container">
      <div className="flex" id="row-header">
        {showLabels ? <div className="flex-1 h-10"></div> : ``}
        <div className="flex-1 h-10 text-lg text-center text-gray-600">Obligations</div>
        <div className="flex-1 h-10 text-lg text-center text-gray-600">Rights</div>
      </div>
      {formattedTerms.map((term, i) => (
        <div className="flex flex-col" key={`row-${term.name}-${i}`}>
          <div className="flex" id="row-chart-data">
            {showLabels ? <div className="flex-1 h-10 text-sm text-right mr-3 text-black" id="labels">{term.name}</div> : ``}
            <div
              className={`flex-1 h-10 ${term.patternClassName ? backgroundColorClasses[term.patternClassName] : 'bg-gray-400'} ${term.patternClassName ? hoverColorClasses[term.patternClassName] : 'hover:bg-gray-400/70'}`}
              id={`obligations-${term.name}`}
              onClick={() => {
                setOpen(!open);
                setOpenIndex(i);
              }}
            >
              <div className={`h-10 bg-white ${term.type === "Obligation" && term.strength > 0 ? percentageWidthClasses[(5 - term.strength).toString()] : 'w-full'}`}></div>
            </div>
            <div className="flex-1 h-10 bg-white" id={`rights-${term.name}`}>
              <div
                className={`h-10 ${term.type === "Right" && term.strength > 0 ? percentageWidthClasses[term.strength.toString()] : 'w-0'} ${term.patternClassName ? backgroundColorClasses[term.patternClassName] : 'bg-gray-400'} ${term.patternClassName ? hoverColorClasses[term.patternClassName] : 'hover:bg-gray-400/70'}`}
                onClick={() => {
                  setOpen(!open);
                  setOpenIndex(i);
                }}
              >
              </div>
            </div>
          </div>
          {
            open && openIndex === i &&
            <ExpandableRow term={term} onClick={() => setOpen(false)} entryId={entryId} />
          }
        </div>
      ))}
    </div>
  );
}

export default Chart
