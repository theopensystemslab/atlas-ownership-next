import React, { PropsWithChildren } from "react"
import MapboxGlobe from "./MapboxGlobe"

type Props = PropsWithChildren<{}>

const GlobeLayout = (props: Props) => {
  const { children } = props
  return (
    <div className="absolute w-full h-full">
      <MapboxGlobe />

      {children}
    </div>
  )
}

export default GlobeLayout
