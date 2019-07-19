/**
 * Biblioteca para fornecer rapidamente uma API REST com express.
 */
const restful = require('node-restful')
const mongoose = restful.mongoose


/**
 * Criando o esquema MongoDB para uma mensagem do usuário.
 */
const messageSchema = new mongoose.Schema({
    message: { type: String, required: true },
    base: { type: String, default: 'sent' },
    sendAt: { type: Date, default: Date.now }
})


/**
 * Criando o esquema MongoDB para um chat.
 */
const chatSchema = new mongoose.Schema({
    session_id: { type: String },
    context: {},
    userName: { type: String },
    input: {},
    messages: [messageSchema]
}, { usePushEach: true })


// Cria o modelo do esquema (rest) e o exporta
module.exports = restful.model('Chat', chatSchema)