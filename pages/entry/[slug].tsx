import { motion } from "framer-motion"
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

  return entry ? (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: {
          delay: 1,
        },
      }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 2,
      }}
    >
      <EntryLayout entry={entry} />
    </motion.div>
  ) : null
}

export default EntryPage
