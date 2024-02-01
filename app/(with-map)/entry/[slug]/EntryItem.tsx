import { HTMLProps, PropsWithChildren } from "react"

type Props = HTMLProps<HTMLDivElement> & {
  heading: string
}

const EntryItem = ({ heading, children, ...rest }: Props) => (
  <section {...rest}>
    <div
      role="doc-subtitle"
      className={`mb-1 ${children ? "text-sm" : "text-base sm:text-2xl"}`}
    >
      {heading}
    </div>
    {children}
  </section>
)

export default EntryItem
