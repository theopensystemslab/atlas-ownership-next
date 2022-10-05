import { ButtonHTMLAttributes, DetailedHTMLProps } from "react"

type Props = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

const Button = (props: Props) => {
  return <button {...props} />
}

export default Button
