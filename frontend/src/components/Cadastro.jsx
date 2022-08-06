import React, {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Button, Form} from 'react-bootstrap'
import './Cadastro.css'
import Api from '../api/Api'

const Cadastro = () => {

  //STATES
  const [nome, setNome] = useState("")
  const [data_nascimento, setDataNascimento] = useState("")
  const [cpf, setCpf] = useState("")
  const [celular, setCelular] = useState("")
  const [email, setEmail] = useState("")
  const [endereco, setEndereco] = useState("")
  const [observacao, setObservacao] = useState("")

  const [msg, setMsg] = useState("")


  //FUNÇÕES
  const handleEnviar = async(e) => {
    e.preventDefault()

    const resposta = await ( Api.enviar(nome,data_nascimento,cpf,celular,email,endereco,observacao,"c") )
    setMsg(resposta.msg)
    setTimeout(()=> setMsg(''),3000)

  }

  const handleLimpar = () => {
    setNome('')
    setDataNascimento('')
    setCpf('')
    setCelular('')
    setEmail('')
    setEndereco('')
    setObservacao('')
  }

  //JSX ==================
  function renderForm(){
    return (
      <div className='div-root-cadastro'>
        <Form className='form-cadastro'>
          <h3 className='mb-4'>Cadastro de Cliente</h3>
          <Form.Group className='mb-3 form-largura'>
            <Form.Control
              className='mb-3'
              type='text'
              value={nome}
              placeholder='Nome do cliente.'
              onChange={e => setNome(e.target.value)}
            />
            <Form.Control
              className='mb-3'
              type='text'
              value={data_nascimento}
              placeholder='Data de nascimento.'
              onChange={e => setDataNascimento(e.target.value)}
            />            
            <Form.Control
              className='mb-3'
              type='text'
              value={cpf}
              placeholder='Número do CPF do cliente.'
              onChange={e => setCpf(e.target.value)}
            />
            <Form.Control
              className='mb-3'
              type='text'
              value={celular}
              placeholder='Número do celular do cliente.'
              onChange={e => setCelular(e.target.value)}
            />    
            <Form.Control
              className='mb-3'
              type='email'
              value={email}
              placeholder='E-mail do cliente.'
              onChange={e => setEmail(e.target.value)}
            />
            <Form.Control
              className='mb-3'
              type='text'
              value={endereco}
              placeholder='Endereço do cliente.'
              onChange={e => setEndereco(e.target.value)}
            />                                            
            <Form.Control
              className='mb-3 input-altura'
              type='text'
              value={observacao}
              placeholder='Observações.'
              onChange={e => setObservacao(e.target.value)}
            />                
          </Form.Group>

          <Form.Group className="mb-3" >
            <Button variant="primary" className='button-largura' onClick={handleEnviar}>
                Salvar
            </Button>{' '}
            <Button variant="secondary" className='button-largura' onClick={handleLimpar}>
                Limpar
            </Button>
          </Form.Group>

        </Form>
        {
          msg != '' && 
          <div className="msg">
            {msg}
          </div>
        }
      </div>
    )
  }

  return (
    <div className="cadastro-root content">
      {renderForm()}
    </div>
  )

}

export default Cadastro;