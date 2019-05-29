/**
 * Obtém as variáveis de ambiente do arquivo '.env'
 */
require('dotenv').config()


/**
 * Importando módulo para trabalhar com o Watson.
 */
const watson = require('watson-developer-cloud')

// Importando o módulo pageChatService.
const pageChatService = require('../pageChat/pageChatService')



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
construirCenario = (input) => new Promise((resolve, reject) => {
    /**
     * Pesquisa o contextID informado, se não existir, cria uma nova conversa e a retorna usando o resolve().
     */
    pageChatService.find({session_id: input.session_id}, (err, data) =>{
        if(err || data.length == 0 || data == undefined){
            let pageChat = new pageChatService({
                input: input.message || undefined,
                session_id: undefined
            })

            // Define a sessão como o ID do objeto
            pageChat.session_id = pageChat._id;


            // Retorna a sessão criada
            resolve(pageChat);
        }

        // Se existir, retorna a conversa encontrada.
        else{
            pageChat = data[0];
            pageChat.input = input.message || undefined;

            resolve(pageChat)
        }





    })
})












