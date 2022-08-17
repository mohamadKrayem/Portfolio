import React from 'react'
import Project from '../components/Project'

const Projects = () => {

  return (
    <div className='flex flex-col justify-center items-center md:h-screen md:mb-auto mb-10'>
      <h1 className='font-bold text-5xl leading-normal w-80 mb-6 text-center font-["Poppins"] md:mb-auto mb-10'>My Projects</h1>
      <div className='flex items-center justify-start flex-wrap gap-5 w-4/5'>
        <Project title="Calculator" url="src/assets/CalculatorApp.jpg" repo="https://github.com/mohamadkrayem/calculator" demo="https://mocalculatorapp.netlify.app/"/>
        <Project title="Advice generator app" url="src/assets/AdviceApp.png" repo="https://github.com/mohamadkrayem/Advice-Generator-App" demo="https://advice-generator-app-delta-five.vercel.app/"/>
        <Project title="Huddle Challenge" url="src/assets/Huddle.png" repo="https://github.com/mohamadKrayem/Huddle-Challenge" demo="https://huddle-challenge-five.vercel.app/"/>
        <Project title="Scandiweb" url="src/assets/Scandiweb.png" repo="https://github.com/mohamadkrayem/scandiweb-test" demo="https://react-frontend-jade.vercel.app/"/>
        <Project title="Github search app" url="src/assets/githubSearchApp.png" repo="https://github.com/mohamadkrayem/GithubSearchApp-React" demo="https://react-r97ktp.stackblitz.io/"/>
      </div>
    </div>
  )
}

export default Projects;