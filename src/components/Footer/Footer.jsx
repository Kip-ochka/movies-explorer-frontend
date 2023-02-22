import React from 'react'
import './Footer.scss'
function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <p className="footer__caption">kip0 х BeatFilm.</p>
        <div className="footer__wrapper">
          <p className="footer__date">&#xa9; 2022</p>
          <nav className="footer__links">
            <ul className="footer__links-list">
              <li className="footer__link-item">
                <a
                  href="https://github.com/Kip-ochka"
                  target="_blank"
                  className="footer__link"
                  rel="noreferrer"
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
