import React from 'react';
import {HiPhone} from 'react-icons/hi';
import {SiMinutemailer} from 'react-icons/si';
import ContactComponent from '../components/ContactComponent';

const Contact = () => {
  return (
    <div id='contact' className='col-center md:h-screen'>
      <h1 className='font-bold text-5xl leading-normal w-80 md:mb-4 mb-10 mt-2 font-["Poppins"] text-center text-skin-secondary'>Contact me</h1>
      <div className='col-center md:row-center h-full md:gap-16 gap-4'>
        <div className='w-2/4 h-4/5 border-4 border-solid border-skin-third rounded-full'>
          <img src="/assets/profile.jpg" alt="Mohamad Krayem" srcset="" className='rounded-full w-full h-full border-2 border-solid border-black' />
        </div>
        <div className='col-center flex-wrap md:gap-auto gap-4'>
          <ContactComponent icon={<HiPhone className='md:text-4xl text-3xl text-skin-third'/>} title="Phone" element="+961 3 639 845" />
          <ContactComponent icon={<SiMinutemailer className='md:text-4xl text-3xl text-skin-third'/>} title="Email" element="mohamadkrayem@email.com" />
        </div>
      </div>
    </div>
  )
}

export default Contact