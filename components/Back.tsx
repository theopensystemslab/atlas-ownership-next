import { useRouter } from "next/router"
import { forwardRef, HTMLProps } from "react"

type Props = HTMLProps<HTMLDivElement>

const Back = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { children, ...restProps } = props
  const router = useRouter()
  return (
    <div ref={ref} onClick={() => void router.back()} {...restProps}>
      {children}
    </div>
  )
})

export default Back
