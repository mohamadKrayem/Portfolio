import React from 'react';
import {HiPhone} from 'react-icons/hi';
import {SiMinutemailer} from 'react-icons/si';
import ContactComponent from '../components/ContactComponent';

const Contact = () => {
  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <h1 className='font-bold text-5xl leading-normal w-80 mb-4 mt-2 font-["Poppins"] text-center'>Contact me</h1>
      <div className='flex justify-center items-center h-full gap-16'>
        <div className='w-2/4 h-4/5 border-4 border-solid border-amber-400 rounded-full'>
          <img src="src/assets/profile.jpg" alt="Mohamad Krayem" srcset="" className='rounded-full w-full h-full border-2 border-solid border-black' />
        </div>
        <div className='flex flex-wrap flex-col justify-center items-center'>
          <ContactComponent icon={<HiPhone className='text-4xl text-amber-400'/>} title="Phone" element="+961 3 639 845" />
          <ContactComponent icon={<SiMinutemailer className='text-4xl text-amber-400'/>} title="Email" element="mohamadkrayem@yandex.com" />
        </div>
      </div>
    </div>
  )
}

export default Contact