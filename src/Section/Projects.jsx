import React from 'react'
import Project from '../components/Project'

const Projects = () => {

  return (
    <div className="col-center md:h-screen md:mb-12 mb-10" id="projects">
      <h1 className='font-bold text-5xl leading-normal w-80 mb-6 text-center font-["Poppins"] md:mb-12 mb-10 text-skin-secondary'>
        My Projects
      </h1>
      <div className="row-center flex-wrap gap-5 w-4/5">
        <Project
          title="Calculator"
          url="/assets/CalculatorApp.jpg"
          repo="https://github.com/mohamadkrayem/calculator"
          demo="https://mocalculatorapp.netlify.app/"
        />
        <Project
          title="Advice generator app"
          url="/assets/AdviceApp.png"
          repo="https://github.com/mohamadkrayem/Advice-Generator-App"
          demo="https://advice-generator-app-delta-five.vercel.app/"
        />
        <Project
          title="Huddle Challenge"
          url="/assets/Huddle.png"
          repo="https://github.com/mohamadKrayem/Huddle-Challenge"
          demo="https://huddle-challenge-five.vercel.app/"
        />
        <Project
          title="Scandiweb"
          url="/assets/Scandiweb.png"
          repo="https://github.com/mohamadkrayem/scandiweb-test"
          demo="https://react-frontend-jade.vercel.app/"
        />
        <Project
          title="Github search app"
          url="/assets/githubSearchApp.png"
          repo="https://github.com/mohamadkrayem/GithubSearchApp-React"
          demo="https://react-r97ktp.stackblitz.io/"
        />
        <Project 
          title="RequestCLI"
          url="/assets/requestcli.png"
          repo="https://github.com/mohamadkrayem/requestcli"
        />
      </div>
    </div>
  );
}

export default Projects;