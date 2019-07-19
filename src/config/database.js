/**
 * Cria uma conexão com o banco de dados e a exporta para ser usada como middleware.
 */

 // Importando a biblioteca Mongoose, que proporciona uma solução baseada em esquemas para modelar os dados da aplicação.
const mongoose = require('mongoose')


/**
 * Definindo usePushEach (inserir múltiplos valores em um array) como padrão para todos os esquemas.
 */
mongoose.plugin(schema => { schema.options.usePushEach = true });


// Tornando a conexão global para que a mesma seja usada em outras partes da aplicação.
mongoose.Promise = global.Promise


// Estabelecendo a conexão e exportando 
module.exports = mongoose.connect('mongodb://localhost/db-bil', {useMongoClient: true})

