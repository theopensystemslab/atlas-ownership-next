import { Page } from "@/lib/types"
import { PortableText } from "@portabletext/react"
import React from "react"

export const pageComponents = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => <p className="mb-4">{children}</p>,
    blockquote: ({ children }: { children?: React.ReactNode }) => <blockquote className="text-gray-400 mb-4">{children}</blockquote>,
  }
}

interface ContentPageProps {
  page: Page
}

export const ContentPage = ({ page }: ContentPageProps) => {
  return (
    <div className="w-1/3">
      <h1 className="text-5xl font-semibold mb-12">
        {page?.title}
      </h1>
      <div className="flex flex-col">
        <PortableText
          value={page?.content}
          components={pageComponents}
        />
      </div>
    </div>
  )
}