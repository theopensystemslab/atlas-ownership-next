import React from "react"

export const pageComponents = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => <p className="mb-4">{ children }</p>,
    blockquote: ({ children }: { children?: React.ReactNode }) => <blockquote className="text-gray-400 mb-4">{ children }</blockquote>,
  }
}