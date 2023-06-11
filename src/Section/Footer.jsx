import { HiPhone } from "react-icons/hi"
import { SiMinutemailer } from "react-icons/si"
import { BsInstagram, BsTwitter } from 'react-icons/bs';
import { ImFacebook } from "react-icons/im";
import { ImGithub } from "react-icons/im";

const Footer = () => {
  return (
    <footer className="col-center mt-16 md:w-auto w-80">
      <div className="flex flex-wrap justify-center gap-12 w-[90%]">
        <div className="lg:basis-1/3 w-full md:w-auto text-start">
          <h1 className="footer-title">About</h1>
          <p className='font-["Poppins"] text-xl text-skin-fourth leading-9 mb-6'>
            I'm a Lebanese student. Writing readable, reusable, clean code is my
            goal in my work, helping people is my passion in life. My first rule
            is that getting to know someone new is never a loss.
          </p>
          <div className="flex items-center slef-start gap-3">
            <div className="media">
              <a href="https://www.instagram.com/mo__krayem">
                <BsInstagram className="text-2xl text-skin-fourth " />
              </a>
            </div>
            <div className="media">
              <a href="https://twitter.com/mo_krayem">
              <BsTwitter className="text-2xl text-skin-fourth " />
              </a>
            </div>
            <div className="media">
              <a href="https://www.facebook.com/profile.php?id=100080223470282">
              <ImFacebook className="text-2xl text-skin-fourth " />
              </a>
            </div>
            <div className="media">
              <a href="https://github.com/mohamadkrayem/">
              <ImGithub className="text-2xl text-skin-fourth " />
              </a>
            </div>
          </div>
        </div>

        <div className="lg:basis-1/5 w-full md:w-auto text-start">
          <h1 className="footer-title">Services</h1>
          <li className="service">Web development</li>
          <li className="service">front-end</li>
          <li className="service">back-end</li>
          <li className="service">full-stack</li>
          <li className="service">Ux/Ui desing</li>
        </div>

        <div className="lg:basis-1/3 w-full md:w-auto text-start">
          <h1 className="footer-title">Have a question?</h1>
          <div className="flex items-center gap-2">
            <HiPhone className="text-xl text-skin-fourth" />
            <p className='font-["Poppins"] text-xl text-skin-fourth mb-2'>
              +961 3 639 845
            </p>
          </div>
          <div className="flex items-center gap-2">
            <SiMinutemailer className="text-xl text-skin-fourth" />
            <p className='font-["Poppins"] text-xl text-skin-fourth'>
              mohamadkrayem@email.com
            </p>
          </div>
        </div>
      </div>

      <p className="md:text-2xl sm:text-xl  my-10 text-skin-fourth">
        Copyright &copy; 2022 all rights reserved
      </p>
    </footer>
  );
}

export default Footer