/**
 * Biblioteca para criar os serviços de uma API
 */
const express = require('express')

/**
 * Importando as bibliotecas chatService e chatBot
 */
const chatService = require('../api/chat/chatService')
const chatBot = require('../api/chatBot/chatBot')

/**
 * Módulo para criar as rotas para o servidor recebido por parâmetro
 */
module.exports = function (server) {
    // Criando uma instância express.Router()
    const api = express.Router()

    // Garante que todas as rotas tenham uma URL inicial igual
    server.use('/api', api)

    /**
     * Rota para realizar interações com o chatbot.
     */
    api.post('/chat', (req, res) => {
        if(!req.body.message){
            res.status(403).send({errors: ['No message provided.']})
            return;
        }

        chatBot.analiseBuildMessage({
            session_id: req.body.session_id,
            message:{
                text: req.body.message
            }
        })
        .then((user) =>{
            user.save((err) =>{
                if(err){
                    console.log(err)
                    res.send(err)
                }
                else{
                    res.status(201).json(user)
                }
            })
        })

    })

    /**
     * Rota para fornecer arquivos públicos.
     */
    api.get('/docs', (req, res) =>{
        try {
            /**
            * Importando o JSON com as informações sobre cada documento.
            */
            const documents = require('../api/docs/docsList.json')

            documents.list.forEach(doc => {
                doc['url'] = process.env.SERVICE_URL + '/documents/' + doc.name + doc.extension
            })

            res.status(200).json(documents)


        } catch (err) {
            console.log(err)
            res.status(500).json({'message': 'Erro! Não foi possível listar os arquivos disponíveis.'})
        }
    })


    // Registrando rota para o chatService
    chatService.register(api, '/chat')
}