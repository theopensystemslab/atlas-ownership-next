import _ from "lodash"
import Highcharts from "highcharts"
import HighchartsAccessibility from "highcharts/modules/accessibility"
import HighchartsReact from "highcharts-react-official"

import { Pattern, PatternClass, Term } from "../lib/types"

// https://github.com/highcharts/highcharts-react#highcharts-with-nextjs
if (typeof Highcharts === "object") {
  HighchartsAccessibility(Highcharts)
}

type Props = {
  showLabels: boolean,
  terms?: Term[]
  patterns?: Pattern[]
  patternClasses?: PatternClass[]
}

const Chart = (props: Props) => {
  const { showLabels, terms = [], patterns = [], patternClasses = [] } = props

  // Group terms by pattern
  let totalsByPattern = _(terms)
    .groupBy('pattern._ref')
    .map((term: any) => ({
      pattern: _.find(patterns, ['_id', term[0].pattern._ref]),
      patternName: _.find(patterns, ['_id', term[0].pattern._ref])?.name,
      sumRights: _.sumBy(term, 'rightsIntensity'),
      sumObligations: _.sumBy(term, 'obligationIntensity')
    }))
    .value()

  // Rollup to pattern class, taking the average rights & obligations from each pattern rounded to nearest integer
  let totalsByPatternClass = _(totalsByPattern)
    .groupBy('pattern.class._ref')
    .map((pattern: any) => ({
      patternClass: _.find(patternClasses, ['_id', pattern[0].pattern.class._ref]),
      patternClassName: _.find(patternClasses, ['_id', pattern[0].pattern.class._ref])?.name,
      avgRights: _.round(_.meanBy(pattern, 'sumRights')),
      avgObligations: _.round(_.meanBy(pattern, 'sumObligations')),
    }))
    .sortBy('patternClass.order')
    .value()

  // Ensure totalsByPatternClass has an entry for **every** pattern class, insert one if it doesn't
  if (totalsByPatternClass.length !== patternClasses.length) {
    patternClasses.forEach(globalPatternClass => {
      if (!_.find(totalsByPatternClass, ['patternClassName', globalPatternClass.name])) {
        totalsByPatternClass.push({
          patternClass: globalPatternClass,
          patternClassName: globalPatternClass.name,
          avgRights: 0,
          avgObligations: 0,
        });
      }
    });
  }
  
  // Highcharts config
  const categories: string[] = patternClasses.map(patternClass => patternClass.name)
  const categoryColors: string[] = patternClasses.map(patternClass => patternClass.color.hex)
  const series = [
    { name: "Obligations", data: totalsByPatternClass.map(total => -Math.abs(total.avgObligations) || 0) }, // represent as negative, replace NaN with 0
    { name: "Rights", data: totalsByPatternClass.map(total => total.avgRights || 0) },
  ]

  const options = {
    chart: {
      type: "bar",
      animation: false,
      backgroundColor: "transparent",
      height: "50%", // set height as % of container width to preserve aspect ratio
      style: {
        fontFamily: "inherit",
        fontWeight: 700,
      },
    },
    plotOptions: {
      series: {
        stacking: "normal",
        borderWidth: 0,
        pointPadding: 0,
        groupPadding: 0,
        animation: false,
        enableMouseTracking: false,
        colorByPoint: true,
      },
    },
    series: series,
    colors: categoryColors,
    xAxis: [{
      categories: categories,
      lineColor: "transparent",
      reversed: true,
      labels: {
        enabled: showLabels,
        style: {
          color: "black",
          fontSize: "1em",
        },
      },
      accessibility: {
        description: "Obligations"
      },
    }, { // mirror axis on right side
      opposite: true,
      reversed: true,
      linkedTo: 0,
      visible: false,
      accessibility: {
        description: "Rights"
      },
    }],
    yAxis: [{
      title: {
        text: ""
      },
      labels: {
        enabled: false,
      },
      accessibility: {
        description: "Intensity of Rights or Obligations",
        rangeDescription: "0-5",
      },
      maxPadding: 0,
      visible: true, // visible = true to show plotLines, but essentially hidden
      min: -5,
      max: 5,
      tickInterval: 1,
      gridLineColor: "transparent",
      plotLines: [{
        value: 0,
        color: "#000",
        width: 4,
        zIndex: 999,
      }],
    }],
    title: { text: "" },
    tooltip: { enabled: false },
    legend: { enabled: false },
    credits: { enabled: false },
    accessibility: {
      point: {
        valueDescriptionFormat: "{xDescription} ranks {value}/5 in"
      }
    },
    responsive: {
      rules: [{
        condition: {
          maxWidth: 400,
        },
        chartOptions: {
          xAxis: [{
            labels: {
              enabled: false, // overwrites showLabels prop when condition is met
            },
          }],
        },
      }],
    },
  }

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
    />
  )
}

export default Chart
