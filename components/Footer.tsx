import Link from "next/link"
import { LogoTwitter, LogoGithub, ArrowRight } from "@carbon/icons-react"
import Image from "next/image"
import { trpc } from "@/lib/trpc"

const FooterLinks = () => {
  const pageLinks = [
    { title: "About", path: "/about" },
    { title: "Explore the patterns", path: "/patterns" },
    { title: "Licence", path: "/licence" },
    { title: "Terms of use", path: "/terms-of-use" },
  ]
  return (
    <div className="col-span-4 text-xs mt-2 mb-4">
      <div className="grid grid-cols-4 grid-flow-col grid-rows-3 gap-1">
        {pageLinks.map((link) => (
          <Link key={link.title} href={link.path}>
            <a>{link.title}</a>
          </Link>
        ))}
        <a href="https://airtable.com/shru3ZGjdyhEGTzx6" target="_blank" rel="noreferrer">
          Submit an entry
        </a>
        <a href="mailto:atlasofownership@opensystemslab.io ">
          Contact us
        </a>
      </div>
    </div>
  )
}

const Contributors = () => {
  const { data: contributors, error: contributorsError } = trpc.contributors.useQuery()
  return (
    <div className ="row-span-2 col-span-4">
      <b className="text-md mb-2 block">Contributors</b>
      <div className="grid grid-cols-4 grid-rows-6 grid-flow-col">
      { contributors?.map(contributor => <p key={contributor} className="text-xs mb-1">{contributor}</p>)}
      </div>
    </div>
  )
}

const OSLLogo = () => (
  <div>
    <Image
      src="/logos/osl.png"
      alt="Open System Lab logo"
      width="24px"
      height="32px"
      layout="fixed"
    />
  </div>
)

const SocialIcons = () => (
  <div className="flex space-x-3">
    <LogoTwitter color="white" size={32} />
    <LogoGithub color="white" size={32} />
    <OSLLogo />
  </div>
)

const Discalimer = () => (
  <p className="text-xs col-span-2">
    The Atlas of Ownership is maintained by Open Systems Lab, non profit company
    9152368 registered in England and Wales
  </p>
)

const SubmitButton = () => (
  <a href="https://airtable.com/shru3ZGjdyhEGTzx6" target="_blank" rel="noreferrer" className="bg-white text-black py-1 px-14 col-span-2 col-end-7 mb-4 flex items-center justify-center">
    Submit an entry <ArrowRight className="ml-2" size={16} />
  </a>
)

const Footer = () => (
  <footer className="bottom-0 absolute w-full h-1/4 pl-3 bg-black text-white text-sm grid grid-cols-6 grid-rows-3 gap-1">
    <FooterLinks />
    <SubmitButton />
    <Contributors />
    <Discalimer />
    <SocialIcons />
  </footer>
)

export default Footer
