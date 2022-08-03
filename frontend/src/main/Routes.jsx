import React from "react"
import { Routes, Route } from "react-router-dom"

import Home from "../template/Home"
import Cadastro from "../components/Cadastro"

const Rotas = () => {
    
    return(
        <Routes>
            <Route exact path='/' element={<Home/>}/>
            <Route exact path='/cadastro' element={<Cadastro/>}/>
        </Routes>
    )
}

export default Rotas