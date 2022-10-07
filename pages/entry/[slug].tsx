import { useRouter } from "next/router"
import { useEffect, useMemo } from "react"
import { useGetEntryFromSlug } from "../../lib/queries"
import store from "../../lib/store"
import { trpc } from "../../lib/trpc"

const EntryPage = () => {
  const router = useRouter()
  const getEntry = useGetEntryFromSlug()
  const entry = useMemo(
    () => getEntry(router.query.slug),
    [getEntry, router.query.slug]
  )

  useEffect(() => {
    if (!entry) return
    const {
      location: {
        geopoint: { lat, lng },
      },
    } = entry
    store.map?.flyTo({ center: { lat, lng }, zoom: 18 })
  }, [entry])

  const { data: patterns, error: patternsError } = trpc.patterns.useQuery()
  const { data: patternClasses, error: patternClaassesError } =
    trpc.patternClasses.useQuery()

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
