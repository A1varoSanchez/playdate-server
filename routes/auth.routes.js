const router = require("express").Router()
const { verifyToken } = require("../middlewares/verifyToken.guard")

const {
    signup,
    login,
    verifyt
} = require("../controllers/auth.controllers")


router.post('/signup', signup)

router.post('/login', login)

router.get('/verify', verifyToken, verifyt)


module.exports = router