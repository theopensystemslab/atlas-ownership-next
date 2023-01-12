import Link from "next/link";
import { LogoTwitter, LogoGithub, ArrowRight } from '@carbon/icons-react';
import Image from "next/image";

const FooterLinks = () => {
  const links = [
    { title: "About", path: "/about" },
    { title: "Explore the patterns", path: "/patterns" }, 
    { title: "Submit an entry", path: "/submit" },
    { title: "Licence", path: "/licence" },
    { title: "Terms of use", path: "/terms-of-use" },
  ];
  return (
    <div className="flex flex-col flex-wrap col-span-2 text-xs mt-1">
      {links.map((link) => (
          <Link key={link.title} href={link.path}>
            <a className="mb-0.5">{link.title}</a>
          </Link>
      ))}
    </div>
  );
};

const Collaborators = () => (
  <b className="row-span-2 col-span-4 text-l">Collaborators</b>
);

const OSLLogo = () => (
  <div>
    <Image src="/logos/osl.png" alt="Open System Lab logo" width="24px" height="32px" layout="fixed" />
  </div>
);

const SocialIcons = () => (
  <div className="flex space-x-3">
    <LogoTwitter color="white" size={32}/>  
    <LogoGithub color="white" size={32}/>
    <OSLLogo />
  </div>
);

const Discalimer = () => (
  <p className="text-xs col-span-2">The Atlas of Ownership is maintained by Open Systems Lab, non profit company 9152368 registered in England and Wales</p>
);

const SubmitButton = () => (
  <button className="bg-white text-black py-1 px-14 col-span-2 col-end-7 mb-4 flex items-center justify-center">Submit an entry 	<ArrowRight className="ml-2" size={16} /></button>
);

const Footer = () => (
  <footer className="bottom-0 absolute w-full h-1/4 pl-3 bg-black text-white text-sm grid grid-cols-6 grid-rows-3 gap-1">
    <FooterLinks />
    <SubmitButton />
    <Collaborators />
    <Discalimer />
    <SocialIcons />
  </footer>
);

export default Footer;
