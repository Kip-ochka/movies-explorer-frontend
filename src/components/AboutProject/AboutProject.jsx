import React from 'react'
import SectionTitle from '../SectionTitle/SectionTitle'
import './AboutProject.scss'

function AboutProject() {
  return (
    <section id='about' className='about-project'>
      <div className='about-project__inner'>
        <SectionTitle title='О проекте' />
        <ul className='about-project__text-wrapper'>
          <li className='about-project__text-item'>
            <h3 className='about-project__title'>
              Дипломный проект включал 5 этапов
            </h3>
            <p className='about-project__text'>
              Составление плана, работу над бэкендом, вёрстку, добавление
              функциональности и финальные доработки.
            </p>
          </li>
          <li className='about-project__text-item'>
            <h3 className='about-project__title'>
              На выполнение диплома ушло 5 недель
            </h3>
            <p className='about-project__text'>
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
              соблюдать, чтобы успешно защититься.
            </p>
          </li>
        </ul>
        <ul className='about-project__timer-wrapper'>
          <li className='about-project__timer-item'>
            <p className='about-project__timer about-project__timer_first-week'>
              1 неделя
            </p>
            <p className='about-project__timer-discription'>Back-end</p>
          </li>
          <li className='about-project__timer-item'>
            <p className='about-project__timer'>4 недели</p>
            <p className='about-project__timer-discription'>Front-end</p>
          </li>
        </ul>
      </div>
    </section>
  )
}

export default AboutProject
