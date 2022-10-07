import { useRouter } from "next/router"
import Chart from "../../components/Chart"
import { useGetEntryFromSlug } from "../../lib/queries"
import { trpc } from "../../lib/trpc"

const EntryPage = () => {
  const router = useRouter()
  const getEntry = useGetEntryFromSlug()
  const entry = getEntry((router.query.slug ?? "") as string)

  const { data: patterns, error: patternsError } = trpc.patterns.useQuery()
  const { data: patternClasses, error: patternClaassesError } = trpc.patternClasses.useQuery()

  // Render post...
  return (
    <div>
      {/* <h1 className="m-2">{entry?.name}</h1>
      <div id="chart-container" className="max-w-[800px]">
        <Chart showLabels={true} terms={entry?.terms} patterns={patterns} patternClasses={patternClasses} />
      </div> */}
      {/* <pre>{JSON.stringify(entry, null, 2)}</pre> */}
    </div>
  )
}

export default EntryPage
