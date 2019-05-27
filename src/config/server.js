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









// Criando a instância inicial do servidor Express
const serverExpress = express()

