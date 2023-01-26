import { Pattern } from "@/lib/types";
import { CarbonIconProps, Hotel } from "@carbon/icons-react";
import Image from "next/image";

interface PatternIconProps {
  pattern: Pattern
  className: string
  size: CarbonIconProps["size"]
}

const FallbackIcon = (props: PatternIconProps) => <Hotel size={32} className={props.className}/>

export const PatternIcon = (props: PatternIconProps) => {
  const { pattern, size, className } = props;
  return (
    pattern.iconUrl ?
    <Image
      priority
      className={className}
      src={pattern.iconUrl}
      height={size}
      width={size}
      alt={`${pattern.name} icon`}
    /> 
    : <FallbackIcon {...props}/>
  )
}