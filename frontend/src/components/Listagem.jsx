import React, {useState, useEffect} from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import {Button, Form} from 'react-bootstrap'
import './Listagem.css'
import Api from '../api/Api'


const Listagem = () => {

    const [list, setList] = useState([])


    useEffect(() => {
        buscarPedidos()
    }, [])

    //FUNÇÕES ==================================
    async function buscarPedidos(){
        
        const resposta = await Api.enviar('','','','','','','',"r")
        setList(resposta.dados)
    }


    //JSX ======================================
    function renderTable(){
        return (
            <table className="tabelaClientes">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>Nascimento</th>
                        <th>CPF</th>
                        <th>Celular</th>
                        <th>E-mail</th>
                        <th>Endereço</th>
                        <th>Observação</th>
                        <th>Ações</th>
                    </tr>
                </thead>

                <tbody>
                    {renderRows()}
                </tbody>
            </table>
        )
    }

    function renderRows(){
        
        return list.map(cadastro => 
        
            <tr key={cadastro.id_cliente} id="id_cliente">
                <td>{cadastro.id_cliente}</td>
                <td>{cadastro.nome}</td>
                <td>{cadastro.data_nascimento}</td>
                <td>{cadastro.cpf}</td>
                <td>{cadastro.celular}</td>
                <td>{cadastro.email}</td>
                <td>{cadastro.endereco}</td>
                <td>{cadastro.observacao}</td>
                <td>
                    <Button>Editar</Button>{' '}
                    <Button variant="secondary">Excluir</Button>
                </td>
            </tr>
        )
        
    }


    return(
        <div className="listagem-root content">
            {renderTable()}
        </div>        
    )

}

export default Listagem