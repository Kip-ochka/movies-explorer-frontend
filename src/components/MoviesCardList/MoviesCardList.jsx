import React from 'react'
import MoviesCard from '../MoviesCard/MoviesCard'
import './MoviesCardList.scss'

function MoviesCardList() {
  let comp = 16
  let tab = 8
  let mob = 4
  const myArray = Array.from(Array(100), (_, index) => (
    <MoviesCard key={index} />
  ))

  const [slicedArr, setSlicedArr] = React.useState([])

  const sliceByWidth = (arr, ourLength) => {
    const width = window.innerWidth
    if (width > 768 && width < 1280) {
      return arr.slice(0, 8)
    } else if (width < 768) {
      return arr.slice(0, 4)
    }
    return arr.slice(0, ourLength)
  }

  React.useEffect(() => {
    setSlicedArr(sliceByWidth(myArray, comp))
  }, [])

  const onEshe = () => {}

  console.log(window.innerWidth)
  return (
    <section className='card-list'>
      <ul className='card-list__inner'>{slicedArr.map((item) => item)}</ul>
      <div className='card-list__button-wrapper'>
        <button className='card-list__more-button' onClick={onEshe}>
          Ещё
        </button>
      </div>
    </section>
  )
}

export default MoviesCardList
