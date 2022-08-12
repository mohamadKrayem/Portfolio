import React from 'react'
import Button from '../components/Button'

export const Resume = () => {
  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <h1 className='font-bold text-5xl text-center leading-normal w-80 mb-6 font-["Poppins"]'>Resume</h1>
      <div className='w-[450px] bg-[#1a1a1a] p-6 mb-2 rounded-md'>
        <h1 className='font-bold text-4xl leading-normal text-amber-400'>2020 - 2023</h1>
        <h1 className='text-lg mb-3'>Bachelor Degree in Computer Science</h1>
        <h1 className='mb-4 font-[500] text-[18px] text-[#999999] leading-normal'>Lebanese International University</h1>
        <p className='font-["Poppins"] font-[500] text-[18px] text-[#999999] leading-normal'>In 2020, I decided to start my career in the tech industry, specifically in programming and software engineering. So I enrolled at the Lebanese International university to start with a "Computer Science" major, and hopefully, it is a great journey to be.</p>
      </div>
      <Button text="Download CV" px="px-5" py="py-3"/>
    </div>
  )
}
