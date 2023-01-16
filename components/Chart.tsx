import { Locked } from "@carbon/icons-react"
import _ from "lodash"
import { useState } from "react"

import { Pattern, PatternClass, Term } from "../lib/types"

type Props = {
  rollupToPatternClass: boolean,
  showLabels: boolean,
  terms?: Term[]
  patterns?: Pattern[]
  patternClasses?: PatternClass[]
}

// maps patternClass.name to custom color keys defined in tailwind.config.js
//  tailwind doesn't support templated class names & next's build prevents importing from a common utils file, hence we define these lookups
const bgColorClass: any = {
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

// when expanding a bar, render a div with a transparent background color
const lightBgColorClass: any = {
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

const hoverBgColorClass: any = {
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

// maps pattern.strength values (0-5) to tailwind percentage width
//   ref https://tailwindcss.com/docs/width#percentage-widths
const percentWidthClass: any = {
  "NaN": "w-0", // possible when calculating average strength (divide by zero) for charts rolled up to patternClass
  "0": "w-0",
  "1": "w-1/5",
  "2": "w-2/5",
  "3": "w-3/5",
  "4": "w-4/5",
  "5": "w-5/5", // w-full
};

export const Chart = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState(0);

  const { rollupToPatternClass, showLabels, terms = [], patterns = [], patternClasses = [] } = props;

  // Format the list of individual terms that apply to this entry
  let formattedTerms = _(terms)
    .map((term: any) => ({
      pattern: _.find(patterns, ['_id', term.pattern._ref]),
      patternName: _.find(patterns, ['_id', term.pattern._ref])?.name,
      type: term.rightsIntensity > 0 ? "Right" : "Obligation", // because pattern.type is not consistently populated
      strength: term.strength, // 1-5
    }))
    .map((term: any) => ({
      meta: term.pattern,
      name: term.patternName,
      patternClassName: _.find(patternClasses, ['_id', term.pattern?.class._ref])?.name,
      patternClassOrder: _.find(patternClasses, ['_id', term.pattern?.class._ref])?.order,
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
      meta: _.find(patternClasses, ['_id', pattern[0].pattern.class._ref]),
      name: _.find(patternClasses, ['_id', pattern[0].pattern.class._ref])?.name,
      avgRights: _.round(_.meanBy(pattern, 'sumRights')),
      avgObligations: _.round(_.meanBy(pattern, 'sumObligations')),
    }))
    .sortBy('meta.order')
    .value();

  // Ensure totalsByPatternClass has an entry for **every** pattern class, insert one if it doesn't
  if (totalsByPatternClass.length !== patternClasses.length) {
    patternClasses.forEach(globalPatternClass => {
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

  return rollupToPatternClass ? (
    <div className="m-4" id="chart-container">
      <div className="flex" id="row-header">
        {showLabels ? <div className="flex-1 h-10"></div> : ``}
        <div className="flex-1 h-10 text-lg text-center text-gray-600">Obligations</div>
        <div className="flex-1 h-10 text-lg text-center text-gray-600">Rights</div>
      </div>
      {_.sortBy(totalsByPatternClass, 'meta.order').map(patternClass => (
        <div className="flex" key={`row-${patternClass.name}`}>
          {showLabels ? <div className="flex-1 h-10 text-base text-right mr-3 text-black" id="label">{patternClass.name}</div> : ``}
          <div className={`flex-1 h-10 border-r-white border-r-2 ${patternClass.name ? bgColorClass[patternClass.name] : 'bg-gray-400'}`} id={`obligations-${patternClass.name}`}>
            <div className={`h-10 bg-white ${patternClass.avgObligations > 0 ? percentWidthClass[(5 - patternClass.avgObligations).toString()] : 'w-full'}`}></div>
          </div>
          <div className="flex-1 h-10 bg-white" id={`rights-${patternClass.name}`}>
            <div className={`h-10 ${percentWidthClass[patternClass.avgRights.toString()]} ${patternClass.name ? bgColorClass[patternClass.name] : 'bg-gray-400'}`}></div>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className="mt-4 mb-4" id="chart-container">
      <div className="flex" id="row-header">
        {showLabels ? <div className="flex-1 h-10"></div> : ``}
        <div className="flex-1 h-10 text-lg text-center text-gray-600">Obligations</div>
        <div className="flex-1 h-10 text-lg text-center text-gray-600">Rights</div>
        {showLabels ? <div className="flex-1 h-10"></div> : ``}
      </div>
      {formattedTerms.map((term, i) => (
        <div className="flex flex-col" key={`row-${term.name}-i`}>
          <div className="flex justify-start align-center" id="row-chart-data">
            {showLabels ? <div className="flex-1 h-10 text-sm ml-3 mr-3 text-black" id="labels">{term.type === "Obligation" && term.name}</div> : ``}
            <div 
              className={`flex-1 h-10 ${term.patternClassName ? bgColorClass[term.patternClassName] : 'bg-gray-400'} ${term.patternClassName ? hoverBgColorClass[term.patternClassName] : 'hover:bg-gray-400/70'}`} 
              id={`obligations-${term.name}`}
              onClick={() => {
                setOpen(!open);
                setOpenIndex(i);
              }}
            >
              <div className={`h-10 bg-white ${term.type === "Obligation" && term.strength > 0 ? percentWidthClass[(5 - term.strength).toString()] : 'w-full'}`}></div>
            </div>
            <div className="flex-1 h-10 bg-white" id={`rights-${term.name}`}>
              <div 
                className={`h-10 ${term.type === "Right" && term.strength > 0 ? percentWidthClass[term.strength.toString()] : 'w-0'} ${term.patternClassName ? bgColorClass[term.patternClassName] : 'bg-gray-400'} ${term.patternClassName ? hoverBgColorClass[term.patternClassName] : 'hover:bg-gray-400/70'}`}
                onClick={() => {
                  setOpen(!open);
                  setOpenIndex(i);
                }}
              >
              </div>
            </div>
            {showLabels? <div className="flex-1 h-10 text-sm text-right mr-3 ml-3 text-black" id="labels">{term.type === "Right" && term.name}</div> : ``}
          </div>
          {
            open && openIndex === i ? 
              <div 
                className={`flex flex-col h-fit w-full p-4 text-gray-600 ${term.patternClassName ? lightBgColorClass[term.patternClassName] : 'bg-gray-200'}`} 
                id="row-expandable-description"
                onClick={() => setOpen(false)}
              >
                <div className="flex justify-between align-start mb-3">
                  <div><Locked size={32} /></div>
                  <div className="text-sm text-right">{term.patternClassName} {term.type.toLowerCase()}</div>
                </div>
                <h2 className="text-base mb-1">{term.name}</h2>
                <p className="text-sm">{term.meta?.description}</p>
              </div>
              : ``
          }
        </div>
      ))}
    </div>
  );
}
