import React from "react";
import './Nav.css'
import { Link } from "react-router-dom";

const Nav = () => (

    <nav className="menu">
        <Link to='/' className="mb-2 text-white">
            Início
        </Link>
        <Link to='/cadastro' className="mb-2 text-white">
            Cadastrar
        </Link>
        <Link to='/listagem' className="mb-2 text-white">
            Listagem
        </Link>
        
    </nav>

)

export default Nav