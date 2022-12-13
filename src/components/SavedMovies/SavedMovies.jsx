import React from 'react'
import './SavedMovies.scss'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import SearchForm from '../SearchForm/SearchForm'
import Preloader from '../Preloader/Preloader'

function SavedMovies({ location }) {
  const [isLoading, setIsLoading] = React.useState(false)
  return (
    <section className='saved-movies'>
      <SearchForm />
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          <MoviesCardList location={location} />
        </>
      )}
    </section>
  )
}

export default SavedMovies
