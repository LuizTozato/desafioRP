import './Dialog.css'
import { Button } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css'

function Dialog(mensagem, callback){
    
    return (
        <div className="gray-background">

            <div className="buttons-area">
                <h3 className='mb-3'>{mensagem}</h3>
                <div>{renderButtons(callback)}</div>
            </div>

        </div>
    )
}

function renderButtons(callback) {
    
    return <>
        <Button variant='primary' onClick={() => callback(true)}>Sim</Button>{' '}
        <Button variant='secondary' onClick={() => callback(false)}>Não</Button>
    </>

}

export default Dialog
