import React from 'react'
import './Footer.scss'
function Footer() {
  return (
    <footer className='footer'>
      <div className='footer__inner'>
        <p className='footer__caption'>
          Учебный проект Яндекс.Практикум х BeatFilm.
        </p>
        <div className='footer__wrapper'>
          <p className='footer__date'>&#xa9; 2022</p>
          <nav className='footer__links'>
            <ul className='footer__links-list'>
              <li className='footer__link-item'>
                <a
                  href='https://praktikum.yandex.ru/'
                  target='_blank'
                  className='footer__link'
                >
                  Яндекс.Практикум
                </a>
              </li>
              <li className='footer__link-item'>
                <a
                  href='https://github.com/Kip-ochka'
                  target='_blank'
                  className='footer__link'
                >
                  GitHub
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  )
}

export default Footer
