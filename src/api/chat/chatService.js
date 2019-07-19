/**
 * Obtendo o esquema de Chat.
 */
const chat = require('./chat')


/**
 * Especifica quais tipos de requisições serão permitidos.
 */
chat.methods(['get','post','put','delete'])


/**
 * Especifica que quando o banco de dados for modificado o novo objeto inserido seja retornado
 * e use as validações do esquema.
 */
chat.updateOptions({new:true, runValidators:true})


// Exportando o serviço completo.
module.exports = chat