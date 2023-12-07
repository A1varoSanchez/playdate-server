
const { response } = require("express")
const Chat = require("../models/Chat.model_")


//CREATE CHAT
const chatInit = (req, res, next) => {

    const { _id: participantOne } = req.payload
    const { friendId: participantTwo } = req.body

    Chat
        .create({ participantOne, participantTwo })
        .then(() => res.sendStatus(200))
        .catch(err => next(err))
}

//FIND ALL CHAT
const getChat = (req, res, next) => {

    Chat
        .find()
        .then(response => res.json(response))
        .catch(err => next(err))
}

//FIND ONE CHAT
const getOneChat = (req, res, next) => {
    const { chatId } = req.params

    Chat
        .findById(chatId)
        .populate({
            path: 'participantTwo participantOne',
            select: { 'username': 1, '_id': 1 },
        })
        .then(response => res.json(response))
        .catch(err => next(err))
}

//SEND MESSAGES
const sendChat = (req, res, next) => {
    const { username: owner } = req.payload
    const { chatId, msn } = req.body
    const messages = { ...msn, owner }

    Chat
        .findByIdAndUpdate(chatId, { $push: { messages } })
        .then(response => res.json(response))
        .catch(err => next(err))
}


module.exports = {
    chatInit,
    getChat,
    sendChat,
    getOneChat
}

