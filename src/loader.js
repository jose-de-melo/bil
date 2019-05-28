/*
    Executa o arquivo qur cria o  servidor em src/config/server.js juntamente com
    os middlewares que todas as requisições passarão e retorna a instância do servidor,
    que é armazenada na constante server.
*/
const server = require('./config/server');

// Importando a conexão com o banco de dados MongoDB
require('./config/database')



