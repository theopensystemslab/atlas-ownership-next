import { ButtonHTMLAttributes, DetailedHTMLProps, forwardRef } from "react"

type Props = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

const Button = forwardRef<HTMLButtonElement, Props>((props, ref) => {
  return <button ref={ref} {...props} />
})

export default Button
