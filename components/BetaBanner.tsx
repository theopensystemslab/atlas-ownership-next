import { Close } from "@carbon/icons-react"
import { useState } from "react"

const BetaBanner = () => {
  const [open, setOpen] = useState(true)

  return open ? (
    <div className="flex justify-between py-1.5 px-2 text-sm w-full bg-safety">
      <div>
        <span className="font-bold ml-12">BETA</span>
        <span className="ml-2">{`This is a prototype. `}</span>
        <span>
          <a
            className="underline"
            href="https://form.typeform.com/to/j262YI8p"
            target="_blank"
            rel="noopener noreferrer"
          >
            Register your support
          </a>
          {` and `}
          <a
            className="underline"
            href="https://form.typeform.com/to/j262YI8p"
            target="_blank"
            rel="noopener noreferrer"
          >
            share your feedback
          </a>
          {`.`}
        </span>
      </div>
      <div>
        <span>
          <button onClick={() => void setOpen(false)}>
            <Close size={"16"} />
          </button>
        </span>
      </div>
    </div>
  ) : null
}

export default BetaBanner
