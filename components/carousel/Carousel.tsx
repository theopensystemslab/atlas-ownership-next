import css from "./Carousel.module.css"
import { ArrowRight } from "@carbon/icons-react"
import { CarouselItem } from "@/lib/types"
import { getFormattedEntryDates } from "@/lib/entry"
import Link from "next/link"
import clsx from "clsx"

export interface CarouselProps {
  data?: CarouselItem[]
  title: string
  cardClassNames?: string
}

const CarouselItem = (props: { item: CarouselItem, cardClassNames: string | undefined }) => {
  return (
    <Link href={`/entry/${props.item.slug?.current}`}>
      <a className={clsx(css.card, props.cardClassNames)}>
        <div className="flex flex-col justify-between">
          <div className="flex justify-between w-full">
            <p>{props.item.name}</p>
            <ArrowRight size={24}/>
          </div>
        <p className="text-xs">{props.item.location?.region}</p>
        </div>
        <p className="text-xs">{getFormattedEntryDates(props.item?.dates)}</p>
      </a>
    </Link>
  )
}

export const Carousel = (props: CarouselProps ) => (
  <div className={css.root}>
    <p className={css.title}>{props.title}</p>
    <div className={css.container}>  
      <div className={css.carousel}>
        { props.data?.map((item, i) => (
          <CarouselItem key={`${item}-${i}`} item={item} cardClassNames={props.cardClassNames}/>
        ))}
      </div>
    </div>
  </div>
)