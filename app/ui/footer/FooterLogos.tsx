import { getFooterLogos } from "@/app/utils/sanity/queries"
import Image from "next/image"

const FooterLogos = async () => {
  const footerLogos = await getFooterLogos()

  return (
    <div className="col-span-full">
      <b className="text-md block mb-2">Thanks to</b>
      <div className="flex items-center flex-wrap gap-y-1 gap-x-12 md:pr-20 justify-start">
        {footerLogos &&
          footerLogos.map((footerLogo) => (
            <Image
              key={footerLogo._id}
              height="100"
              width="200"
              src={footerLogo.logo.asset.url}
              alt={footerLogo.description}
              style={{
                maxWidth: "100%",
                height: "auto",
                objectFit: "contain"
              }} />
          ))}
      </div>
    </div>
  );
}

export default FooterLogos
