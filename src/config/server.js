// Porta na qual o servidor irá rodar
const port = 5432


/**
    Importando as bibliotecas necessárias para rodar o servidor.
    
    As bibliotecas são importadas usando a função require('nome-da-bibilioteca').
    
    Caso seja passado um caminho (ex.: ./config/server), o require busca a biblioteca
    nas pastas da região local deste arquivo.

    Caso seja passado somente o nome do módulo (ex.: 'mongoose'), a busca será realizada
    dentro da pasta node_modules.

 */
const bodyParser = require('body-parser');
const express = require('express');
const allowCors = require('./cors');
const queryParser = require('express-query-int');

// Criando a instância inicial do servidor Express
const serverExpress = express()


/**
 * Aplicando alguns middlewares ao servidor.
 */

// Trata dados de application/x-www-form-urlencoded post data (formulários)
serverExpress.use(bodyParser.urlencoded({extended:true}));

// Trata dados de application/json (JSON)
serverExpress.use(bodyParser.json())

// Faz com que todas as requisições tenham o CORS em seu cabeçalho
serverExpress.use(allowCors)

// Converte valores passados como string que seriam números para o seu tipo corretamente.
serverExpress.use(queryParser())


// Rodando o servidor
serverExpress.listen(port, function(){
    console.log(`Servidor rodando na porta ${port}`)
})

// Após isso, o servidor estará todando em http://localhost:5432/, porém, sem rotas.


// Exporta o servidor para que ele possa ser usado em outros lugares da aplicação. 
module.exports = serverExpress

