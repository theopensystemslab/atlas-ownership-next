import { DefaultSeoProps } from "next-seo"

const SEO: DefaultSeoProps = {
  title: "The Atlas of Ownership",
  additionalLinkTags: [{ rel: "icon", href: "/favicon.ico" }],
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://atlasofownership.org",
    siteName: "Atlas of Ownership",
    title: "Atlas of Ownership",
    description:
      "An open map of property rights and obligations across time and space",
    images: [
      {
        url: "https://atlasofownership.org/images/atlas-ogp-image.png",
        width: 1200,
        height: 630,
        alt: "Atlas of Ownership OGP Image",
        type: "image/png",
      },
    ],
  },
  twitter: {
    handle: "@OpenSystemsLab",
    site: "@OpenSystemsLab",
    cardType: "summary_large_image",
  },
}

export default SEO
