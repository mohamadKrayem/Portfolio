import React from 'react'

const ContactComponent = (props) => {
  return (
    <div className='flex flex-col justify-center items-center gap-4'>
      <div className='bg-[#1a1a1a] rounded-full md:w-24 w-20 md:h-24 h-20 flex justify-center items-center'>
        {props.icon}
      </div>
      <h1 className='text-xl'>{props.title}</h1>
      <h1 className='text-xl text-[#999999]'>{props.element}</h1>
    </div>
  )
}

export default ContactComponent