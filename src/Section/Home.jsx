import React from 'react'

const Home = () => {
  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <div className=''>
        <h1 className='text-amber-400 leading-10'>Hello !</h1>
        <h1 className='font-bold text-3xl leading-normal'>I'm Mohamad Krayem</h1>
        <h1 className='font-bold text-6xl leading-normal text-amber-400'>Full-stack Developer</h1> 
        <h1 className='font-bold text-6xl leading-normal text-amber-400'>CS student</h1>
        <button className='text-xl mt-3 bg-amber-400 rounded-full text-black px-6 py-4 border-2 border-solid border-transparent hover:border-inherit focus:border-sky-400'>Let's work together</button>
      </div>

    </div>
  )
}

export default Home