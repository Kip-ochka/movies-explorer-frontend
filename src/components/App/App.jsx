import { useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { pageWithFooter, pageWithHeader } from '../../utils/scss/variables'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import Main from '../Main/Main'
import NotFoundPage from '../NotFoundPage/NotFoundPage'
import './App.scss'

function App() {
  const lokation = useLocation().pathname
  console.log(lokation)
  const [isLogin, setIsLogin] = useState(true)

  const isPageWithHeader = pageWithHeader.includes(lokation)
  const isPageWithFooter = pageWithFooter.includes(lokation)
  return (
    <div className='page'>
      {isPageWithHeader ? <Header isLogin={isLogin} /> : null}

      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
      {isPageWithFooter ? <Footer /> : null}
    </div>
  )
}

export default App
