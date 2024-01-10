import { Page } from "@/lib/types";
import { ArrowUpRight } from "@carbon/icons-react";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import Head from "next/head";
import React from "react";

export const pageComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mb-4 text-lg">{children}</p>,
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
          className="flex items-center space-x-1 underline"
        >
          <span>{children}</span>

          <ArrowUpRight />
        </a>
      );
    },
  },
};

interface ContentPageProps {
  page?: Page;
  title?: string;
}

export const ContentPage = ({ page, title }: ContentPageProps) => {
  return (
    <div className="w-full sm:w-1/3">
      <Head>
        <title>{title || page?.title} - The Atlas of Ownership</title>
      </Head>
      <h1 className="title mb-12 sm:min-w-[40vw]">{page?.title}</h1>
      <div className="flex flex-col">
        <PortableText value={page?.content} components={pageComponents} />
      </div>
    </div>
  );
};
