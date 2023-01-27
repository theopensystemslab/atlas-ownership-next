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
        <a href="mailto:atlasofownership@opensystemslab.io">
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
  <div className="h-5 w-5 mt-0.5">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 196">
      <path
        fill="currentColor"
        d="M84.07 28.36h27.86V.5H28.36v27.86h55.71zm27.86 0v139.28h27.86V28.36h-27.86zm-83.57 83.57V28.36H.5v139.28h27.86v-55.71zm27.85 55.71H28.36v27.86h83.57v-27.86H56.21z"
      />
    </svg>
  </div>
)

const SocialIcons = () => {
  const socialLinks = [
    { 
      url: "https://twitter.com/OpenSystemsLab", 
      component: <LogoTwitter size={32} />
    },
    { 
      url: "https://github.com/theopensystemslab", 
      component: <LogoGithub size={32} />
    },
    { 
      url: "https://www.opensystemslab.io/", 
      component: <OSLLogo />
    },
  ]
  
  return (
    <div className="grid grid-cols-4 gap-3">
      { socialLinks.map((link, i) => (
        <a 
          key={`social-link-${i + 1}`} 
          href={link.url} 
          target="_blank" 
          rel="noreferrer"
          className="text-white hover:text-gray-500"
        >
          {link.component}
        </a>
      ))}
    </div>
  )
}

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
