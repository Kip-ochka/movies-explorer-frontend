import { useEffect, useState } from 'react'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import Main from '../Main/Main'
import './App.scss'

function App() {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className='page'>
      <Header isLogin={isLogin} />
      <Main />
      <Footer />
    </div>
  )
}

export default App
