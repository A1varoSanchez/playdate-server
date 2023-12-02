const router = require('express').Router()

const { verifyToken } = require('../middlewares/verifyToken.guard')

const {
    chatInit,
    getChat,
    sendChat
} = require('../controllers/chat.controllers')


router.post('/init', verifyToken, chatInit)

router.get('/getChat', getChat)

router.post('/send', verifyToken, sendChat)


module.exports = router