import Link from "next/link"
import css from "./Footer.module.css"

const FooterLinks = () => {
  const pageLinks = [
    { title: "About", path: "/about" },
    { title: "Explore the patterns", path: "/patterns" },
    { title: "Licence", path: "/licence" },
    { title: "Accessibility", path: "/accessibility" },
    { title: "Terms of use", path: "/terms-of-use" },
  ]

  return (
    <div className={css.footerLinkContainer}>
      <div className={css.footerLinks}>
        {pageLinks.map((link) => (
          <Link key={link.title} href={link.path}>
            {link.title}
          </Link>
        ))}
        <a
          href="https://airtable.com/shru3ZGjdyhEGTzx6"
          target="_blank"
          rel="noreferrer"
        >
          Submit an entry
        </a>

        <a
          href="https://form.typeform.com/to/j262YI8p"
          target="_blank"
          rel="noopener noreferrer"
        >
          Contact us
        </a>
      </div>
    </div>
  )
}

export default FooterLinks
