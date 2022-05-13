import logo from './logo.svg';
import React  from 'react';
import Home from './Components/Home';
import About from './Components/About';
import Stock from './Components/Stock';
import Navbar from './Components/Navbar';
import './App.css';
import {Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/chart' element={<Stock/>}/>
        <Route path='/about' element={<About/>}/>
      </Routes>

    </div>
  );
}

export default App;
