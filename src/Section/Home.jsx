import React from 'react';
import Button from '../components/Button';

const Home = () => {
  return (
    <div id='home' className='px-4 md:px-auto col-center h-screen'>
      <div className=''>
        <h1 className='text-skin-third leading-10 mb-6'>Hello !</h1>
        <h1 className='font-bold leading-normal md:text-3xl text-2xl mb-6 text-skin-secondary'>I'm <span className='text-skin-third'>Mohamad Krayem</span></h1>
        <h1 className='font-bold leading-normal md:text-6xl text-3xl mb-6 text-skin-secondary'>Full-stack <span className='text-skin-third'>Developer</span></h1> 
        <h1 className='font-bold leading-normal md:text-6xl text-3xl mb-6 text-skin-secondary'>CS <span className='text-skin-third'>student</span></h1>
        <Button text="Let's work together" px="md:px-6 px-4" py="md:py-4 py-3"/>
      </div>

    </div>
  )
}

export default Home