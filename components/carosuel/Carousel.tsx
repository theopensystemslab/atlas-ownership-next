import css from "./Carousel.module.css"

export const Carousel = () => {
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  return (
    <div className={css.root}>
      <p>Other examples of XXXXX</p>
      <div className={css.container}>
        <div className={css.carousel}>
          { data.map(item => (
            <div key={item} className={css.card}>
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}