import React from 'react';
import Button from '../components/Button';

const Home = () => {
  return (
    <div className='px-4 md:px-auto flex flex-col justify-center items-center h-screen'>
      <div className=''>
        <h1 className='text-amber-400 leading-10'>Hello !</h1>
        <h1 className='font-bold md:text-3xl text-2xl leading-normal'>I'm <span className='text-amber-400'>Mohamad Krayem</span></h1>
        <h1 className='font-bold md:text-6xl text-4xl leading-normal text-white'>Full-stack <span className='text-amber-400'>Developer</span></h1> 
        <h1 className='font-bold md:text-6xl text-4xl leading-normal text-white'>CS <span className='text-amber-400'>student</span></h1>
        <Button text="Let's work together" px="md:px-6 px-4" py="md:py-4 py-3"/>
      </div>

    </div>
  )
}

export default Home