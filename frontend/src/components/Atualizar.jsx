import React, {useState, useEffect} from 'react'
import { useSearchParams } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import InputMask from 'react-input-mask'
import {Button, Form} from 'react-bootstrap'
import './Atualizar.css'
import Api from '../api/Api'
import dataNova from '../utils/DataNova'
import { validate } from 'gerador-validador-cpf'

const Atualizar = () => {

  //STATES
  const [id_cliente, setIdCliente] = useState("")
  const [nome, setNome] = useState("")
  const [data_nascimento, setDataNascimento] = useState("")
  const [cpf, setCpf] = useState("")
  const [celular, setCelular] = useState("")
  const [email, setEmail] = useState("")
  const [endereco, setEndereco] = useState("")
  const [observacao, setObservacao] = useState("")

  const [msg, setMsg] = useState("")
  const [searchParams] = useSearchParams()


  useEffect( () => {
    
    const id_aux = searchParams.get("id_cliente")
    setIdCliente(id_aux)

    const fetchData = async () => {
        
        const cliente = await Api.enviar("POST",id_aux)
        setNome(cliente.dados.nome)
        setDataNascimento(cliente.dados.data_nascimento)
        setCpf(cliente.dados.cpf)
        setCelular(cliente.dados.celular)
        setEmail(cliente.dados.email)
        setEndereco(cliente.dados.endereco)
        setObservacao(cliente.dados.observacao)
    }

    fetchData()

  }, [])

  //FUNÇÕES
  const handleEnviar = async(e) => {
    e.preventDefault()

    const saneamento = sanearInput()
    if(saneamento.validacao){
    
      const resposta = await ( Api.enviar("PUT",id_cliente,nome,data_nascimento,cpf,celular,email,endereco,observacao) )
      setMsg(resposta.msg)
      setTimeout(()=> setMsg(''),3000)
    
    } else {

      setMsg(saneamento.mensagem)
      setTimeout(()=> setMsg(''),3000)
    }

  }

  function sanearInput(){
    
    let validacao = true
    let mensagem = 'OK'

    if(nome === ''){
      validacao = false
      mensagem = "Nome em branco"
    }
    else if( isNaN( dataNova(data_nascimento) ) ){
      validacao = false
      mensagem = "Data de nascimento inválida"
    }
    else if( !validate(cpf) ){
      validacao = false
      mensagem = "CPF inválido"
    }
    else if(celular.replace(/[^0-9]/g, '').length !== 11){
      validacao = false
      mensagem = "Celular inválido"
    }
    else if(email === '' || !email.includes('@')){
      validacao = false
      mensagem = "E-mail inválido"
    }
    else if(endereco === ''){
      validacao = false
      mensagem = "Endereço em branco"
    } else if(observacao.replace(/[ ]/, '').length > 300){
      validacao = false
      mensagem = "Campo observação possui mais de 300 caracteres."
    }
    
    return {validacao, mensagem}

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
      <div className='div-root-atualizar'>
        <Form className='form-atualizar'>
          <h3 className='mb-4'>Atualizar Cliente</h3>
          <Form.Group className='mb-3 form-largura'>
            <Form.Control
              className='mb-3'
              type='text'
              value={nome}
              placeholder='Nome do cliente.'
              onChange={e => setNome(e.target.value.replace(/[^a-zA-Zà-úÀ-Ú ]/g, ''))}
            />
            <Form.Control
              as={InputMask}
              mask="99/99/9999"            
              className='mb-3'
              type='text'
              value={data_nascimento}
              placeholder='Data de nascimento.'
              onChange={e => setDataNascimento(e.target.value)}
            />            
            <Form.Control
              as={InputMask}
              mask="999.999.999-99"
              className='mb-3'
              type='text'
              value={cpf}
              placeholder='Número do CPF do cliente.'
              onChange={e => setCpf(e.target.value)}
            />
            <Form.Control
              as={InputMask}
              mask="(99) 99999-9999"            
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
              as="textarea"
              rows={3}
              maxLength={300}            
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
          msg !== '' && 
          <div className="msg">
            {msg}
          </div>
        }
      </div>
    )
  }

  return (
    <div className="atualizar-root content">
      {renderForm()}
    </div>
  )

}

export default Atualizar;