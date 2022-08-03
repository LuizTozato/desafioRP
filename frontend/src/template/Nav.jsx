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
        <Link to='/listar' className="mb-2 text-white">
            Pesquisar
        </Link>
    </nav>

)

export default Nav