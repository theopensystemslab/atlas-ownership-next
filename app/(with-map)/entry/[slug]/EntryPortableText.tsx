import { ArrowUpRight } from "@carbon/icons-react"
import {
  PortableText,
  PortableTextComponents,
  PortableTextProps,
} from "@portabletext/react"

export const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mb-4 text-sm">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="text-gray-400 mb-4">{children}</blockquote>
    ),
    h2: ({ children }) => (
      <h2 className="mb-2 mt-8 font-semibold text-lg">{children}</h2>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      return (
        <a
          href={value.href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center space-x-1 underline"
        >
          <span>{children}</span>

          <ArrowUpRight />
        </a>
      )
    },
  },
}

const EntryPortableText = ({ value }: PortableTextProps) => {
  return <PortableText value={value} components={components} />
}

export default EntryPortableText
