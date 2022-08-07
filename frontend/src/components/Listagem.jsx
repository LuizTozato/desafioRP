import React, {useState, useEffect} from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import './Listagem.css'
import {Button} from 'react-bootstrap'
import Dialog from "../template/Dialog"
import Api from '../api/Api'


const Listagem = () => {

    const [list, setList] = useState([])
    const [dialog, setDialog] = useState(null)
    const [msg, setMsg] = useState("")


    useEffect(() => {
        buscarPedidos()
    }, [])

    //FUNÇÕES ==================================
    async function buscarPedidos(){
        
        const resposta = await Api.enviarGet(0)
        setList(resposta.dados)
    }

    function editarClickEvent(id_cliente) {
        window.location.href = "/atualizar?id_cliente=" + id_cliente
    }    

    function deleteClickEvent(id_cliente) {
        openDialog(
            "Está certo da exclusão?",
            (confirmado) => {
                
                closeDialog()

                if (confirmado) {
                    confirmaExclusao(id_cliente)
                }
            }
        )
    }

    function openDialog(message, callback, config) {
        setDialog(Dialog(message, callback, config))
    }    

    function closeDialog() {
        setDialog(null)
    }

    async function confirmaExclusao(id_cliente) {
        
        const resposta = await ( Api.enviar("DELETE",id_cliente) )
        setMsg(resposta.msg)
        setList( list.filter(p => p.id_cliente !== id_cliente) )
        setTimeout(()=> setMsg(''),3000)

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
                    <Button onClick={() => editarClickEvent(cadastro.id_cliente)}>Editar</Button>{' '}
                    <Button variant="secondary" onClick={() => deleteClickEvent(cadastro.id_cliente)}>Excluir</Button>
                </td>
            </tr>
        )
        
    }


    return(
        <div className="listagem-root content">
            {renderTable()}
            {dialog}
            {
                msg !== '' && 
                <div className="msg">
                    {msg}
                </div>
            }
        </div>        
    )

}

export default Listagem