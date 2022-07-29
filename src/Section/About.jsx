import React from 'react'

const About = () => {
  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <div>
        <h1 className='font-bold text-4xl leading-normal'>About Me</h1>
        <table className='text-xl font-medium'>
          <tr>
            <td>Name:</td>
            <td className='text-[#999999]'>Mohamad Krayem</td>
          </tr>
          <tr>
            <td>Date of birth:</td>
            <td className='text-[#999999]'>May 30, 2002</td>
          </tr>
          <tr>
            <td>Email:</td>
            <td className='text-[#999999]'>Mohamadkrayem1244@hotmail.com</td>
          </tr>
          <tr>
            <td>Phone:</td>
            <td className='text-[#999999]'>+9613639845</td>
          </tr>
        </table>
      </div>
    </div>
  )
}

export default About