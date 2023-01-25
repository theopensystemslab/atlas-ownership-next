import Link from "next/link"
import { LogoTwitter, LogoGithub, ArrowRight } from "@carbon/icons-react"
import Image from "next/image"

const FooterLinks = () => {
  const links = [
    { title: "About", path: "/about" },
    { title: "Explore the patterns", path: "/patterns" },
    { title: "Licence", path: "/licence" },
    { title: "Terms of use", path: "/terms-of-use" },
  ]
  return (
    <div className="flex justify-between items-center p-2 sm:flex-col flex-wrap col-span-6 sm:col-span-2 text-xs sm:mt-1">
      {links.map((link) => (
        <Link key={link.title} href={link.path} className="sm:mb-0.5">
          {link.title}
        </Link>
      ))}
    </div>
  )
}

const Collaborators = () => (
  <b className="hidden sm:flex row-span-2 col-span-4 text-xs">Collaborators</b>
)

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
  <div className="hidden sm:flex space-x-3">
    <LogoTwitter color="white" size={32} />
    <LogoGithub color="white" size={32} />
    <OSLLogo />
  </div>
)

const Discalimer = () => (
  <p className="text-xs p-2 sm:p-0 col-span-6 sm:col-span-2">
    The Atlas of Ownership is maintained by Open Systems Lab, non profit company
    9152368 registered in England and Wales
  </p>
)

const SubmitButton = () => (
  <a 
    href="https://airtable.com/shru3ZGjdyhEGTzx6" 
    target="_blank" 
    rel="noreferrer" 
    className="bg-white text-black py-1 px-14 col-span-6 sm:col-span-2 col-end-7 mb-1 sm:mb-4 flex items-center justify-center"
  >
    Submit an entry <ArrowRight className="ml-2" size={16} />
  </a>
)

const Footer = () => (
  <footer className="bottom-0 absolute w-full h-1/4 sm:pl-3 bg-black text-white text-xs sm:text-sm grid grid-cols-6 grid-rows-3 gap-1">
    <FooterLinks />
    <SubmitButton />
    <Collaborators />
    <Discalimer />
    <SocialIcons />
  </footer>
)

export default Footer
