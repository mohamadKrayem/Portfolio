import React from 'react'

const Footer = () => {
  return (
    <footer className='flex justify-center'>
      <div className="flex flex-wrap items-center justify-center gap-12 w-[90%]">
        <div className='lg:basis-1/3 '>
          <h1 className='font-bold text-3xl leading-normal '>About</h1>
          <p className='font-["Poppins"] text-xl text-[#ffffffb3]'>I'm a Lebanese student. Writing readable, reusable, clean code is my goal in my work, helping people is my passion in life. My first rule is that getting to know someone new is never a loss.</p>
        </div>

        <div className='lg:basis-1/5 '>
          <h1 className='font-bold text-3xl leading-normal'>Services</h1>
          <li className='list-none text-[#ffffffb3] font-["Poppins"] text-xl text-[#ffffffb3]'>Web development</li>
          <li className='list-none text-[#ffffffb3] font-["Poppins"] text-xl text-[#ffffffb3]'>front-end</li>
          <li className='list-none text-[#ffffffb3] font-["Poppins"] text-xl text-[#ffffffb3]'>back-end</li>
          <li className='list-none text-[#ffffffb3] font-["Poppins"] text-xl text-[#ffffffb3]'>full-stack</li>
          <li className='list-none text-[#ffffffb3] font-["Poppins"] text-xl text-[#ffffffb3]'>Ux/Ui desing</li>
        </div>

        <div className='lg:basis-1/3 '>
          <h1 className='font-bold text-3xl leading-normal '>Have a question?</h1>
          <p className='font-["Poppins"] text-xl text-[#ffffffb3]'></p>
          </div>
      </div>
    </footer>
  )
}

export default Footer