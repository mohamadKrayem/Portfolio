import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Home from './Section/Home';
import About from './Section/About';
import Skills from './Section/Skills';
import { Resume } from './Section/Resume';
import Projects from './Section/Projects';
import Contact from './Section/Contact';
import Footer from './Section/Footer';

function App() {

  return (
    <div className="bg-black text-white">
      <Navbar />
      <Home />
      <About />
      <Skills />
      <Resume />
      <Projects />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
