
const { response } = require("express")
const Chat = require("../models/Chat.model_")



const chatInit = (req, res, next) => {
    const participantOne = { _id } = req.payload
    const participantTwo = { friendId } = req.body
    const messages = []

    Chat
        .create({ participantOne: _id, participantTwo: friendId, messages })
        .then(() => res.sendStatus(200))
        .catch(err => next(err))
}

const getChat = (req, res, next) => {

    Chat
        .find()
        .then(response => res.json(response))
        .catch(err => next(err))
}

const getOneChat = (req, res, next) => {
    const { chatId } = req.params
    console.log(chatId)
    Chat
        .findById(chatId)
        .populate({
            path: 'participantTwo participantOne',
            select: { 'username': 1, '_id': 1 },
        })

        .then(response => res.json(response))
        .catch(err => next(err))
}

const sendChat = (req, res, next) => {
    const { username } = req.payload
    const { chatId, msn } = req.body
    const messages = {
        ...msn,
        owner: username
    }
    console.log(chatId, msn)

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

