import React from 'react'
import SearchForm from '../SearchForm/SearchForm'
import Preloader from '../Preloader/Preloader'
import './Movies.scss'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
function Movies() {
  const [isLoading, setIsLoading] = React.useState(false)
  return (
    <main className='movies'>
      <SearchForm />
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          <MoviesCardList />
        </>
      )}
    </main>
  )
}

export default Movies
