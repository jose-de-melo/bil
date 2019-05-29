/**
 * Obtendo o esquema de PageChat.
 */
const PageChat = require('./pageChat')


/**
 * Especifica quais tipos de requisições serão permitidos.
 */
PageChat.methods(['get','post','put','delete'])


/**
 * Especifica que quando o banco de dados for modificado o novo objeto inserido seja retornado
 * e use as validações do esquema.
 */
PageChat.updateOptions({new:true, runValidators:true})


// Exportando o serviço completo.
module.exports = PageChat