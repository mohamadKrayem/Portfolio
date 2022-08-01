import React from 'react'
import Button from '../components/Button'

const Home = () => {
  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <div className=''>
        <h1 className='text-amber-400 leading-10'>Hello !</h1>
        <h1 className='font-bold text-3xl leading-normal'>I'm <span className='text-amber-400'>Mohamad Krayem</span></h1>
        <h1 className='font-bold text-6xl leading-normal text-white'>Full-stack <span className='text-amber-400'>Developer</span></h1> 
        <h1 className='font-bold text-6xl leading-normal text-white'>CS <span className='text-amber-400'>student</span></h1>
        <Button text="Letk's work together" px="6" py="4"/>
      </div>

    </div>
  )
}

export default Home