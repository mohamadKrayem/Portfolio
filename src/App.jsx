import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Home from './Section/Home';
import About from './Section/About';
import Skills from './Section/Skills';
import { Resume } from './Section/Resume';

function App() {

  return (
    <div className="bg-black text-white">
      <Navbar />
      <Home />
      <About />
      <Skills />
      <Resume />
    </div>
  )
}

export default App
