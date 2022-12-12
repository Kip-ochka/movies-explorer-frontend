import React from 'react'
import './SectionTitle.scss'
function SectionTitle({ title }) {
  return (
    <div className='section-title'>
      <h2 className='section-title__text'>{title}</h2>
      <div className='section-title__underline'></div>
    </div>
  )
}

export default SectionTitle
