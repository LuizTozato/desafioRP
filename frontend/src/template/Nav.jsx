import React from "react";
import './Nav.css'
import { Link } from "react-router-dom";

const Nav = () => (

    <nav className="menu">
        <Link to='/' className="mb-2 text-white hover-on">
            Início
        </Link>
        <Link to='/cadastro' className="mb-2 text-white hover-on">
            Cadastrar
        </Link>
        <Link to='/listagem' className="mb-2 text-white hover-on">
            Listagem
        </Link>
        
    </nav>

)

export default Nav