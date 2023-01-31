import { Page } from "@/lib/types"
import { PortableText } from "@portabletext/react"
import Head from "next/head"
import React from "react"

export const pageComponents = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => <p className="mb-4">{children}</p>,
    blockquote: ({ children }: { children?: React.ReactNode }) => <blockquote className="text-gray-400 mb-4">{children}</blockquote>,
    h2: ({ children }: { children?: React.ReactNode }) => <h2 className="text-2xl mb-2 mt-8">{children}</h2>,
  }
}

interface ContentPageProps {
  page?: Page
  title?: string
}

export const ContentPage = ({ page, title }: ContentPageProps) => {
  return (
    <div className="w-full sm:w-1/3">
      <Head>
        <title>{title || page?.title} - The Atlas of Ownership</title>
      </Head>
      <h1 className="text-3xl sm:text-5xl font-semibold mb-12">
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