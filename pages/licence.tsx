import NoopLayout from "../components/layout/NoopLayout"

const LicencePage = () => {
  return (
    <div className="w-1/3">
      <h1 className="text-5xl font-semibold mb-12">
        Licence
      </h1>
      <div className="flex flex-col w-3/4">
        <p className="mb-3">
          This is a placeholder sentence.
        </p>
      </div>
    </div>
  )
}

LicencePage.getLayout = NoopLayout

export default LicencePage
