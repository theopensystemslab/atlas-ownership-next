import { useEntry } from "../../lib/store"

const EntryPage = () => {
  const entry = useEntry()
  // Render post...
  return (
    <div className="bg-rent">
      <pre>{JSON.stringify(entry, null, 2)}</pre>
    </div>
  )
}

export default EntryPage
