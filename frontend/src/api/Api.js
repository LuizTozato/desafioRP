export default {

    async enviar ( acao, id_cliente='', nome='', data_nascimento='', cpf='', celular='', email='', endereco='', observacao='') {

        //acao = 'POST' -> create new ou 1 único cliente,
        //  'PUT' -> update,
        //  'DELETE' -> delete

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
        let requisicao = {
            method: acao,
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(cliente)
        }

        console.log(requisicao)

        //o que retorna:
        const response = await fetch('http://localhost/newm/', requisicao)
        const data = await response.json()
        console.log(data)
        return data

    },

    async enviarGet ( busca, offset, limit = 10) {

        //acao = 'GET' -> read all

        //como vou enviar:
        let requisicao = {
            method: "GET",
            headers: {'Content-Type' : 'application/json'}
        }

        console.log(requisicao)

        //o que retorna:
        const response = await fetch('http://localhost/newm/?' + new URLSearchParams({
            busca,
            offset,
            limit
        }), requisicao)
        const data = await response.json()
        console.log(data)
        return data

    }
}