const router = require('express').Router()

const { verifyToken } = require('../middlewares/verifyToken.guard')

const {
    chatInit,
    getChat,
} = require('../controllers/chat.controllers')


router.post('/init', verifyToken, chatInit)

router.get('/getChat', getChat)


module.exports = router