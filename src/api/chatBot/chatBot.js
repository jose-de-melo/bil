/**
 * Obtém as variáveis de ambiente do arquivo '.env'
 */
require('dotenv').config()


/**
 * Importando módulo para trabalhar com o Watson.
 */
const watson = require('watson-developer-cloud')

// Importando o módulo chatService.
const chatService = require('../chat/chatService')



/**
 * Configuração do assistente do IBM Watson através das chaves configuradas no arquivo .env.
 * process.env.<NOME_VARIAVEL> retorna o valor da variável de ambiente <NOME_VARIAVEL>.
 */
const assistant = new watson.AssistantV1({
    username: process.env.WATSON_USERNAME,
    password: process.env.WATSON_PASSWORD,
    url: process.env.WATSON_URL,
    version: process.env.WATSON_VERSION
});


/**
 * Retorna um objeto que representa a conversa do usuário no banco de dados.
 * Caso não exista, a conversa será criada.
 * É uma promise, o que indica que ela irá rodar em segundo plano para ser resolvida.
 */
recoverOrCreateChat = (input) => new Promise((resolve, reject) => {
    /**
     * Pesquisa o contextID informado, se não existir, cria uma nova conversa e a retorna usando o resolve().
     */
    chatService.find({session_id: input.session_id}, (err, data) =>{
        if(err || data.length == 0 || data == undefined){
            let chat = new chatService({
                input: input.message || undefined,
                session_id: undefined
            })

            // Define a sessão como o ID do objeto
            chat.session_id = chat._id;

            // Retorna a sessão criada
            resolve(chat);
        }

        // Se existir, retorna a conversa encontrada.
        else{
            chat = data[0];
            chat.input = input.message || undefined;

            resolve(chat)
        }
    })
    
})

/*
rebuildIntentsEntitysContext = (watsonObjec) => new Promise((resolve, reject) =>{

})
**/


/**
 * Principal função do módulo, recebe um input do usuário, verifica se o mesmo já tem uma conversa iniciada, envia a mensagem para o Watson, trata a resposta
 * e a devolve ao usuário.
 */
module.exports.analiseBuildMessage = (input) => new Promise((resolve, reject) =>{
    recoverOrCreateChat(input).then((user) => {
        assistant.message({
            workspace_id: process.env.WATSON_WORKSPACE_ID,
            session_id: user.session_id,
            context: user.context,
            input: user.input
        }, (err, res) =>{
            if(err) {
                console.log(err)
                reject(err)
            }else{
                user.messages.push({
                    message: input.message.text
                })

                res.output.text.forEach(message =>{
                    user.messages.push({
                        message: message,
                        base: 'received'
                    })
                })

                user.context = res.context

                resolve(user)
            }
        })
    })
})















