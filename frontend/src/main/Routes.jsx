import React from "react"
import { Routes, Route } from "react-router-dom"

import Home from "../template/Home"
import Cadastro from "../components/Cadastro"
import Listagem from "../components/Listagem"

const Rotas = () => {
    
    return(
        <Routes>
            <Route exact path='/' element={<Home/>}/>
            <Route exact path='/cadastro' element={<Cadastro/>}/>
            <Route exact path='/listagem' element={<Listagem/>}/>
        </Routes>
    )
}

export default Rotas