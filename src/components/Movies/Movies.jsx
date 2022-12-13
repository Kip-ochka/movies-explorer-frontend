import React from 'react'
import SearchForm from '../SearchForm/SearchForm'
import Preloader from '../Preloader/Preloader'
import './Movies.scss'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import { useLocation } from 'react-router-dom'

function Movies({ location }) {
  const [isLoading, setIsLoading] = React.useState(false)

  return (
    <main className='movies'>
      <SearchForm />
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          <MoviesCardList location={location} />
        </>
      )}
    </main>
  )
}

export default Movies
