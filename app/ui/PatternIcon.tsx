import { CarbonIconProps } from "@carbon/icons-react/lib/CarbonIcon"
import Image from "next/image"
import { Pattern } from "../utils/sanity/types"

interface PatternIconProps {
  pattern: Partial<Pattern>
  className?: string
  size: CarbonIconProps["size"]
}

const FallbackIcon = (props: PatternIconProps) => (
  <div className={props.className}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size}
      height={props.size}
      fill="none"
      viewBox="0 0 124 120"
    >
      <path
        fill="#000"
        d="M68 60C68 63.3137 65.3137 66 62 66C58.6863 66 56 63.3137 56 60C56 56.6863 58.6863 54 62 54C65.3137 54 68 56.6863 68 60Z"
      />
    </svg>
  </div>
)

export const PatternIcon = (props: PatternIconProps) => {
  const { pattern, size, className } = props

  return pattern.iconUrl ? (
    <div className={`flex items-center justify-center ${className}`}>
      <Image
        priority
        src={pattern.iconUrl}
        alt={`${pattern.name} icon`}
        {...(size ? { height: Number(size), width: Number(size) } : {})}
        style={{
          maxWidth: "100%",
          height: "auto"
        }} />
    </div>
  ) : (
    <FallbackIcon {...props} />
  );
}
