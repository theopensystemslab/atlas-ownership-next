"use client"
import "client-only"
import { ArrowUpRight, Close } from "@carbon/icons-react"
import { useState } from "react"

const BetaBanner = () => {
  const [open, setOpen] = useState(true)

  return open ? (
    <div className="flex justify-between py-[0.5rem] px-2 text-base w-full bg-safety">
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
        </span>
        <span>
          {` and share your `}
          <a
            className="underline"
            href="https://form.typeform.com/to/j262YI8p"
            target="_blank"
            rel="noopener noreferrer"
          >
            feedback
          </a>
          {`. `}
        </span>
        <span>
          <a
            // className="inline-flex items-center space-x-1 underline"
            href="https://about.atlasofownership.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="inline-flex underline items-center">
              {`Find out more about how to support the Atlas of Ownership `}
              <ArrowUpRight />
            </span>
          </a>
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
