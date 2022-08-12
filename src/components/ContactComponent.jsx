import React from 'react'

const ContactComponent = (props) => {
  return (
    <div className='flex flex-col justify-center items-center gap-4'>
      <div className='bg-[#1a1a1a] rounded-full w-24 h-24 flex justify-center items-center'>
        {props.icon}
      </div>
      <h1 className='text-xl'>{props.title}</h1>
      <h1 className='text-xl text-[#999999]'>{props.element}</h1>
    </div>
  )
}

export default ContactComponent