import React, {useState, useEffect} from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import './Listagem.css'
import {Button, Form} from 'react-bootstrap'
import Dialog from "../template/Dialog"
import Api from '../api/Api'
import _ from 'lodash'


const Listagem = () => {

    const [list, setList] = useState([])
    const [dialog, setDialog] = useState(null)
    const [msg, setMsg] = useState("")
    const [busca, setBusca] = useState('')
    const [offset, setOffset] = useState(0)
    const [totalPedidos, setTotalPedidos] = useState(0)      

    const [linhasTabela, setLinhasTabela] = useState(10)


    useEffect(() => {
        buscarPedidos()
                    
    }, [busca, offset])

    //FUNÇÕES ==================================
    async function buscarPedidos(){
        
        const resposta = await Api.enviarGet(busca, offset)
        console.log(resposta)
        
        setList(resposta.dados[0])
        const total = resposta.dados[1]['total']
        setTotalPedidos(total)
        
        habilitarOuDesabilitarBotoesPaginacao(total)
    }

    function habilitarOuDesabilitarBotoesPaginacao(total){
        offset === 0? 
            document.getElementById("botao-anterior-paginacao").setAttribute('disabled','') : 
            document.getElementById("botao-anterior-paginacao").removeAttribute('disabled','')

        offset + linhasTabela >= total?
            document.getElementById("botao-proxima-paginacao").setAttribute('disabled','') : 
            document.getElementById("botao-proxima-paginacao").removeAttribute('disabled','')
    }

    function editarClickEvent(id_cliente) {
        window.location.href = "/cadastro?id_cliente=" + id_cliente
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
        buscarPedidos()
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

    function handleFilter(e){

        setOffset(0)
        setBusca(e.target.value)
    }

    const debounced_handleFilter = _.debounce(handleFilter, 500)

    function renderFilterInput(){
        return (
            <div className="div-root-filter">
                <Form className="formListagem">
                    <h6 className="text-filter">Filtro:</h6>
                    <Form.Control
                        id="inputBusca"
                        type="text"
                        onChange={debounced_handleFilter}
                        placeholder="Digite o nome ou e-mail do cliente"/>
                </Form>
                <h6 className="text-exibicao">Exibindo de {offset+1} até {offset+linhasTabela>totalPedidos?totalPedidos:offset+linhasTabela}. Total de itens: {totalPedidos}. </h6>
                <hr></hr>
            </div>
        )
    }

    function proximaPagina(){
            setOffset( offset + linhasTabela )
    }

    function paginaAnterior(){
            setOffset( offset - linhasTabela )
    }

    function renderPagination(){
        return(
            <>
                <div className="paginacao">
                    <h5 className="mb-0 text-exibicao">Paginação:</h5>
                    <Button id="botao-anterior-paginacao" variant="light" onClick={paginaAnterior}>Anterior</Button>
                    <Button id="botao-proxima-paginacao" variant="dark" onClick={proximaPagina}>Próxima</Button>                
                </div>
                <hr></hr>
            </>
            
        )
    }

    return(
        <div className="listagem-root content">
            {renderFilterInput()}
            {renderPagination()}            
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