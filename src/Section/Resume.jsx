import React from 'react'
import Button from '../components/Button'

export const Resume = () => {
  return (
    <div id="resume" className="col-center md:h-screen md:my-auto my-16">
      <h1 className='font-bold text-5xl text-center leading-normal w-80 mb-6 md:mb-12 font-["Poppins"] text-skin-secondary'>
        Resume
      </h1>
      <div className="md:w-[450px] w-80 bg-skin-fifth p-6 mb-2 rounded-md">
        <h1 className="font-bold md:text-4xl text-3xl leading-normal text-skin-third">
          2020 - 2023
        </h1>
        <h1 className="md:text-lg mb-3 text-skin-secondary">
          Bachelor Degree in Computer Science
        </h1>
        <h1 className="mb-4 font-[500] md:text-[18px] text-[16.5px] text-skin-fourth leading-normal">
          Lebanese International University
        </h1>
        <p className='font-["Poppins"] font-[500] md:text-[18px] text-[16.5px] text-skin-fourth leading-normal'>
          In 2020, I decided to start my career in the tech industry,
          specifically in programming and software engineering. So I enrolled at
          the Lebanese International university to start with a "Computer
          Science" major, and hopefully, it is a great journey to be.
        </p>
      </div>
      <Button url="/assets/resume.pdf" text="Download CV" px="px-5" py="py-3" />
    </div>
  );
}
