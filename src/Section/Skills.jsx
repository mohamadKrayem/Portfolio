import React from 'react'
import Skill from '../components/Skill'

const Skills = () => {
  return (
    <div id='skills' className='col-center md:h-screen md:gap-12'>
      <h1 className='font-bold text-5xl leading-normal w-80 mb-6 text-center text-skin-secondary'>My Skills</h1>
      <div className='flex flex-wrap w-[80%] gap-5'>
        <Skill skill="HTML" percentage="90" width="w-[90%]"/>
        <Skill skill='CSS' percentage='80' width='w-4/5'/>
        <Skill skill='JavaScript' percentage='80' width='w-4/5'/>
        <Skill skill='React' percentage='80' width='w-4/5'/>
        <Skill skill='NodeJS' percentage='70' width='w-[70%]'/>
        <Skill skill='ExpressJS' percentage='65' width='w-[65%]'/>
        <Skill skill='MongoDB' percentage='70' width='w-[70%]'/>
        <Skill skill='MySQL' percentage='90' width='w-[90%]'/>
        <Skill skill='PHP' percentage='70' width='w-[70%]'/>
        <Skill skill='Laravel' percentage='50' width='w-[50%]'/>
        <Skill skill='tailwindCSS' percentage='90' width='w-[90%]'/>
        <Skill skill='Git' percentage='90' width='w-[90%]'/>
        <Skill skill='Windows' percentage='90' width='w-[90%]'/>
        <Skill skill='Linux' percentage='75' width='w-3/4'/>
        <Skill skill='Java' percentage='75' width='w-3/4'/>
        <Skill skill='GoLang' percentage='80' width='w-4/5'/>
        <Skill skill='Shell' percentage='80' width='w-4/5'/>
        <Skill skill='Unity' percentage='75' width='w-3/4'/>
      </div>
    </div>
  )
}

export default Skills