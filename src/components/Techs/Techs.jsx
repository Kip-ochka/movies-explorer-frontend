import React from 'react'
import SectionTitle from '../SectionTitle/SectionTitle'
import './Tech.scss'

const techArr = ['HTML', 'CSS', 'JS', 'React', 'Git', 'Express.js', 'mongoDB']

function Techs() {
  return (
    <section className='tech' id='tech'>
      <div className='tech__inner'>
        <SectionTitle title='Технологии' />
        <h2 className='tech__title'>7 технологий</h2>
        <p className='tech__text'>
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
        <div className='tech__grid'>
          {techArr.map((tech, id) => {
            return (
              <p className='tech__item' key={id}>
                {tech}
              </p>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Techs
