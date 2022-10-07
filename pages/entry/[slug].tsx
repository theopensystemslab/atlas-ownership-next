import Chart from "../../components/Chart"
import { useEntry } from "../../lib/store"

const EntryPage = () => {
  const entry = useEntry()
  // Render post...
  return (
    <div>
      <h1 className="m-2">{entry?.name}</h1>
      <div id="chart-container" className="max-w-[800px]">
        <Chart showLabels={true} terms={entry?.terms} patterns={patterns} patternClasses={patternClasses} />
      </div>
      {/* <pre>{JSON.stringify(entry, null, 2)}</pre> */}
    </div>
  )
}

export default EntryPage
