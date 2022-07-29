import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Home from './Section/Home';
import About from './Section/About';

function App() {

  return (
    <div className="bg-black text-white">
      <Navbar />
      <Home />
      <About />
    </div>
  )
}

export default App
