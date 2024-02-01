import { backgroundColorClasses } from "./styles"
import { PatternClassTotal } from "./MarkerChart"

type Props = {
  patternClassTotal: PatternClassTotal
  showLabels: boolean
}

const DataRow = (props: Props) => {
  const { patternClassTotal: patternClass, showLabels } = props

  return (
    <div className="flex">
      {showLabels ? (
        <div className="w-1/5 h-10 text-black text-sx sm:text-sm text-right flex items-center justify-end mr-3">
          {patternClass.name}
        </div>
      ) : (
        ``
      )}
      <div
        className="flex-1 grid border-r-white border-r-2"
        style={{
          gridTemplateColumns: `repeat(5, minmax(0, 1fr))`,
          direction: "rtl",
        }}
      >
        <div
          className={`${
            patternClass.avgObligations > 0 &&
            backgroundColorClasses[patternClass.name!]
          } h-10`}
          style={{ gridColumn: `span ${patternClass.avgObligations}` }}
        ></div>
      </div>
      <div
        className="flex-1 grid"
        style={{
          gridTemplateColumns: `repeat(5, minmax(0, 1fr))`,
          direction: "ltr",
        }}
      >
        <div
          className={`${
            patternClass.avgRights > 0 &&
            backgroundColorClasses[patternClass.name!]
          } h-10`}
          style={{ gridColumn: `span ${patternClass.avgRights}` }}
        ></div>
      </div>
    </div>
  )
}

export default DataRow
