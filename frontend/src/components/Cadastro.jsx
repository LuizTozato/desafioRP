import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Button, Form} from 'react-bootstrap'
import './Cadastro.css'

const Cadastro = () => {

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
              placeholder='Nome do cliente.'
            />
            <Form.Control
              className='mb-3'
              type='number'
              placeholder='Número do CPF do cliente.'
            />
            <Form.Control
              className='mb-3'
              type='number'
              placeholder='Número do celular do cliente.'
            />    
            <Form.Control
              className='mb-3'
              type='email'
              placeholder='E-mail do cliente.'
            />                                
            <Form.Control
              className='mb-3 input-altura'
              type='text'
              placeholder='Observações.'
            />                
          </Form.Group>

          <Form.Group className="mb-3" >
            <Button variant="primary" className='button-largura'>
                Salvar
            </Button>{' '}
            <Button variant="secondary" className='button-largura'>
                Limpar
            </Button>
          </Form.Group>

        </Form>
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