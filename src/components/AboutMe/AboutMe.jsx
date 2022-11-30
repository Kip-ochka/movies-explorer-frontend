import React from 'react'
import SectionTitle from '../SectionTitle/SectionTitle'
import './AboutMe.scss'
import { ReactComponent as Arrow } from '../../images/text__COLOR_font-main.svg'
const porfolioArr = [
  {
    linkName: 'Статичный сайт',
    link: 'https://github.com/Kip-ochka/how-to-learn',
  },
  {
    linkName: 'Адаптивный сайт',
    link: 'https://kip-ochka.github.io/russian-travel/',
  },
  {
    linkName: 'Одностраничное приложение',
    link: 'https://mesto.kip0.nomoredomains.icu',
  },
]

function AboutMe() {
  return (
    <section className='about'>
      <div className='about__inner'>
        <SectionTitle title='Студент' />
        <div className='about__bio-grid'>
          <div className='about__bio-flex'>
            <div className='about__bio-text'>
              <h3 className='about__title'>Игорь</h3>
              <p className='about__description'>Фронтент-разработчик, 28 лет</p>
              <p className='about__bio'>
                Я родился и живу в Саратове, закончил факультет экономики СГУ.
                Уменя есть жена и дочь. Я люблю слушать музыку, а ещё
                увлекаюсьбегом. Недавно начал кодить. С 2015 года работал в
                компании «СКБКонтур». После того, как прошёл курс по
                веб-разработке, началзаниматься фриланс-заказами и ушёл с
                постоянной работы.
              </p>
            </div>
            <a
              href='https://github.com/Kip-ochka'
              target='_blank'
              rel='noreferrer'
              className='about__link'
            >
              GitHub
            </a>
          </div>
          <img
            src='https://podacha-blud.com/uploads/posts/2021-08/1627959524_35-p-foto-tortikov-36.jpg'
            alt='Фото на паспорт'
            className='about__photo'
          />
        </div>

        <div className='about__portfolio'>
          <p className='about__portfolio-text'>Портфолио</p>
          {porfolioArr.map((item, id) => {
            return (
              <a href={item.link} className='portfolio__project' key={id}>
                <p>{item.linkName}</p>
                <Arrow />
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default AboutMe
