import { trpc } from "@/lib/trpc"
import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect, useMemo } from "react"
import { EntryLayout } from "../../components/layout/EntryLayout"
import { useGetEntryFromSlug } from "../../lib/queries"
import store from "../../lib/store"

const EntryPage = () => {
  const router = useRouter()
  const getEntry = useGetEntryFromSlug()
  const entry = useMemo(
    () => getEntry(router.query.slug),
    [getEntry, router.query.slug]
  )

  useEffect(() => {
    if (!entry?.location?.geopoint) return
    const {
      location: {
        geopoint: { lat, lng },
      },
    } = entry
    store.map?.flyTo({ center: { lat, lng }, zoom: 18 })
  }, [entry])


  const { data: carouselItems, error: carouselItemsError } = trpc.tenureType.useQuery({ tenureTypes: entry?.tenureType, id: entry?._id })

  return entry ? (
    <>
      <Head>
        <title>{entry?.name} - The Atlas of Ownership</title>
      </Head>
      <EntryLayout entry={entry} carouselItems={carouselItems} />
    </>)
    : null
}

export default EntryPage
