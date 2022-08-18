import React from 'react'

const Skill = (props) => {
  return (
    <div className='flex flex-wrap w-80'>
      <div className='w-full flex justify-between px-4'>
        <h1 className='text-md font-bold text-skin-secondary'>{props.skill}</h1>
        <span className='text-skin-secondary'>{props.percentage}%</span>
      </div>
      <div className='h-4 w-full bg-skin-secondary rounded-md'>
        <div className={'rounded-l-md h-full '+ props.width +' bg-skin-third'}></div>
      </div>
    </div>
  )
}

export default Skill