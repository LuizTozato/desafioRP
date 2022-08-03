import React from 'react'
import './App.css'
import { BrowserRouter } from 'react-router-dom'

import Logo from '../template/Logo'
import Nav from '../template/Nav'
import Header from '../template/Header'
import Rotas from './Routes'


const App = () => {

  return (
    <BrowserRouter>
      <div className="app">
        <Logo/>
        <Nav/>
        <Header/>
        <Rotas/>
      </div>
    </BrowserRouter>
    
  )

}

export default App;