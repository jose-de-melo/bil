/**
 * Importando o JSON com as informações sobre cada documento.
 */
const docs = require('../api/docs/docsList.json')


/**
 * Biblioteca para criar os serviços de uma API
 */
const express = require('express')

// Biblioteca usada para listar o conteúdo de diretórios
const fs = require('fs')



/**
 * Importando as bibliotecas chatService e chatBot
 */
const chatService = require('../api/chat/chatService')
const chatBot = require('../api/chatBot/chatBot')

let typesDocs = ['checklist', 'manual', 'open-process', 'other']


/**
 * Definindo o caminho do diretório onde estão os arquivos
 * 
 * __dirname é uma string que armazena o diretório onde está o arquivo
 */
const path = __dirname.slice(0, __dirname.indexOf('/src/')) + process.env.DOCS_PATH


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
        const resp = {} 
        fs.readdir(path, (err, paths) => {
            if(err){
                console.log(err)
                res.status(500).json({'message': 'Erro! Não foi possível listar os arquivos disponíveis.', 'erros': err})
            }
            else{
                resp['files'] = []
                if(paths.length > 0){
                    let file

                    paths.forEach(element => {
                        file = {
                            'name': element.slice(element.indexOf('- ')+2),
                            'url': process.env.SERVICE_URL + '/documents/' + element,
                            'type_doc': typesDocs[parseInt(element.slice(0, element.indexOf(' -'))) - 1],
                            'extension': element.slice(element.lastIndexOf('.') + 1, element.length),
                            'description': 'Se tratando de clubes, o Galo é o maior de todos e isso não há o que discutir.'
                        }

                        resp['files'].push(file)
                    });

                }
                res.status(200).json(resp)
            }
        })
    })


    // Registrando rota para o chatService
    chatService.register(api, '/chat')
}