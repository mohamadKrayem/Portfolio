import { HiPhone } from "react-icons/hi"
import { SiMinutemailer } from "react-icons/si"
import { BsInstagram, BsTwitter } from 'react-icons/bs';
import { ImFacebook } from "react-icons/im";

const Footer = () => {
  return (
    <footer className='flex flex-col items-center justify-center mt-16 md:w-auto w-80'>
      <div className="flex flex-wrap justify-center gap-12 w-[90%]">
        <div className='lg:basis-1/3 w-full md:w-auto text-start'>
          <h1 className='font-bold text-3xl leading-normal md:mb-10 mb-6'>About</h1>
          <p className='font-["Poppins"] text-xl text-[#ffffffb3] leading-9 mb-6'>I'm a Lebanese student. Writing readable, reusable, clean code is my goal in my work, helping people is my passion in life. My first rule is that getting to know someone new is never a loss.</p>
          <div className="flex items-center slef-start gap-3">
            <div className="rounded-full bg-[#1a1a1a] w-14 h-14 flex justify-center items-center">
              <BsInstagram className="text-2xl text-[#ffffffb3] "/>
            </div>
            <div className="rounded-full bg-[#1a1a1a] w-14 h-14 flex justify-center items-center">
              <BsTwitter className="text-2xl text-[#ffffffb3] "/>
            </div>
            <div className="rounded-full bg-[#1a1a1a] w-14 h-14 flex justify-center items-center">
              <ImFacebook className="text-2xl text-[#ffffffb3] "/>
            </div>
          </div>
        </div>

        <div className='lg:basis-1/5 w-full md:w-auto text-start'>
          <h1 className='font-bold text-3xl leading-normal md:mb-10 mb-6'>Services</h1>
          <li className='list-none font-["Poppins"] text-xl text-[#ffffffb3] mb-2'>Web development</li>
          <li className='list-none font-["Poppins"] text-xl text-[#ffffffb3] mb-2'>front-end</li>
          <li className='list-none font-["Poppins"] text-xl text-[#ffffffb3] mb-2'>back-end</li>
          <li className='list-none font-["Poppins"] text-xl text-[#ffffffb3] mb-2'>full-stack</li>
          <li className='list-none font-["Poppins"] text-xl text-[#ffffffb3] mb-2'>Ux/Ui desing</li>
        </div>

        <div className='lg:basis-1/3 w-full md:w-auto text-start'>
          <h1 className='font-bold text-3xl leading-normal md:mb-10 mb-6'>Have a question?</h1>
          <div className="flex items-center gap-2">
            <HiPhone className="text-xl text-[#ffffffb3]"/>
            <p className='font-["Poppins"] text-xl text-[#ffffffb3] mb-2'>+961 3 639 845</p>
          </div>
          <div className="flex items-center gap-2">
            <SiMinutemailer className="text-xl text-[#ffffffb3]"/>
            <p className='font-["Poppins"] text-xl text-[#ffffffb3]'>
              mohamadkrayem@yandex.com
            </p>
          </div>
        </div>
      </div>

      <p className="md:text-2xl sm:text-xl  my-10 text-[#ffffffb3]">Copyright &copy; 2022 all rights reserved</p>
      
    </footer>
  )
}

export default Footer