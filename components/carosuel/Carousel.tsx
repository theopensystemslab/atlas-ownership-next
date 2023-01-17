import css from "./Carousel.module.css"
import { ArrowRight } from "@carbon/icons-react"

interface CarouselItem {
  title: string
  location: string
  date ?: string
}

export interface CarouselProps {
  data: CarouselItem[]
}

const CarouselItem = (props: { item: CarouselItem }) => (
  <div className={css.card}>
    <div className="flex flex-col justify-between">
      <div className="flex justify-between w-full">
        <p>{props.item.title}</p>
        <ArrowRight size={24}/>
      </div>
    <p className="text-xs">{props.item.location}</p>
    </div>
    <p className="text-xs">{props.item.date}</p>
  </div>
)

export const Carousel = (props: CarouselProps ) => {
  const { data } = props
  return (
    <div className={css.root}>
      <p className={css.title}>Other examples of XXXXX</p>
      <div className={css.container}>  
        <div className={css.carousel}>
          { data.map((item, i) => (
            <CarouselItem key={`${item}-${i}`} item={item} />
          ))}
        </div>
      </div>
    </div>
  )
}