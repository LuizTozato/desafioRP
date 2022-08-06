export default {

    async enviar ( nome, data_nascimento, cpf, celular, email, endereco, observacao ) {

        //montando o objeto cliente
        let cliente = {
            nome,
            data_nascimento,
            cpf,
            celular,
            email,
            endereco,
            observacao
        }

        //como vou enviar:
        let requisicao = {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(cliente)
        }

        console.log(requisicao)

        //o que retorna:
        const response = await fetch('http://localhost/newm/', requisicao)
        const data = await response.json()
        console.log(data)
        return data.msg

    }
}