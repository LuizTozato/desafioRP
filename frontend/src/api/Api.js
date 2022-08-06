export default {

    async enviar ( acao, id_cliente='', nome='', data_nascimento='', cpf='', celular='', email='', endereco='', observacao='') {

        //acao = 'POST' -> create ou 1 requisicao, 'GET' -> read all, 'PUT' -> update, 'DELETE' -> delete
        //montando o objeto cliente
        let cliente = {
            id_cliente,
            nome,
            data_nascimento,
            cpf,
            celular,
            email,
            endereco,
            observacao,
        }

        //como vou enviar:
        let requisicao
        if(acao === "GET"){
            requisicao = {
                method: acao,
                headers: {'Content-Type' : 'application/json'}
            }
        } else {
            requisicao = {
                method: acao,
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify(cliente)
            }
        }

        console.log(requisicao)

        //o que retorna:
        const response = await fetch('http://localhost/newm/', requisicao)
        const data = await response.json()
        console.log(data)
        return data

    }
}