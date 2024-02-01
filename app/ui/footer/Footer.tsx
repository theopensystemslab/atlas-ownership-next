import Contributors from "./Contributors"
import Disclaimer from "./Disclaimer"
import css from "./Footer.module.css"
import FooterLinks from "./FooterLinks"
import FooterLogos from "./FooterLogos"
import SocialIcons from "./SocialIcons"

const Footer = () => {
  return (
    <footer className={css.footer}>
      <FooterLinks />
      <Disclaimer />
      <Contributors />
      <SocialIcons />
      <FooterLogos />
    </footer>
  )
}
export default Footer
