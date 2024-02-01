import { getContributors } from "@/app/utils/sanity/queries"
import css from "./Footer.module.css"

const Contributors = async () => {
  const contributors = await getContributors()
  return (
    <div className={css.contributors}>
      <b className="text-md mb-3 block">Contributors</b>
      <div className="grid grid-cols-auto grid-rows-4 grid-flow-col gap-1">
        {contributors?.map((contributor) => (
          <p key={contributor}>{contributor}</p>
        ))}
      </div>
    </div>
  )
}

export default Contributors
