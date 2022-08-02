import React from 'react'

const Skill = (props) => {
  return (
    <div className='flex flex-wrap w-80'>
      <div className='w-full flex justify-between px-4'>
        <h1 className='text-md font-bold'>{props.skill}</h1>
        <span>{props.percentage}%</span>
      </div>
      <div className='h-4 w-full bg-gray-600 rounded-md'>
        <div className={'rounded-l-md h-full '+ props.width +' bg-amber-400'}></div>
      </div>
    </div>
  )
}

export default Skill