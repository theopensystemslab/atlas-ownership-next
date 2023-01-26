import clsx from "clsx"

interface TagProps {
  children: React.ReactNode
  className?: string
}

export const Tag = (props: TagProps) => (
  <div className={clsx(`rounded-full w-fit px-4 text-sm py-1 capitalize text-black ${props.className}`)}>{props.children}</div>
)