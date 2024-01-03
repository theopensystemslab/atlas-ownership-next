import { trpc } from "@/lib/trpc"
import { NextSeo } from "next-seo"
import { useRouter } from "next/router"
import { useEffect, useMemo } from "react"
import { EntryLayout } from "../../components/layout/EntryLayout"
import { useGetEntryFromSlug } from "../../lib/queries"
import store from "../../lib/store"
import SEO from "@/next-seo.config"

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

  const { data: carouselItems, error: carouselItemsError } =
    trpc.tenureType.useQuery({
      tenureTypes: entry?.tenureType,
      id: entry?._id,
    })

  const title = `${entry?.name} - The Atlas of Ownership`

  return entry ? (
    <>
      <NextSeo
        title={title}
        openGraph={{
          title,
          description: entry.description,
          url: SEO.openGraph?.url + `${router.asPath}`,
          images: [
            {
              url: entry.mainImage?.file?.asset?.url ?? "",
              alt: "Atlas of Ownership OGP Image",
              type: "image/png",
            },
          ],
        }}
      />

      <EntryLayout entry={entry} carouselItems={carouselItems} />
    </>
  ) : null
}

export default EntryPage
