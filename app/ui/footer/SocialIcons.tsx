import { LogoGithub, LogoTwitter } from "@carbon/icons-react"
import css from "./Footer.module.css"

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
      component: <LogoTwitter size={32} />,
    },
    {
      url: "https://github.com/theopensystemslab",
      component: <LogoGithub size={32} />,
    },
    {
      url: "https://www.opensystemslab.io/",
      component: <OSLLogo />,
    },
  ]

  return (
    <div className={css.socialIcons}>
      {socialLinks.map((link, i) => (
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

export default SocialIcons
