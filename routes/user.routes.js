const router = require("express").Router()
const { verifyToken } = require("../middlewares/verifyToken.guard")

const {
    myProfile,
    addChild,
    getAllUsers,
    addFriend,
    deleteFriend
} = require("../controllers/user.controllers")


router.get('/perfil/:id', verifyToken, myProfile)

router.post('/addchild', verifyToken, addChild)

router.get('/getAllUser', getAllUsers)

router.post('/addFriend', verifyToken, addFriend)

router.post('/deletFriend', verifyToken, deleteFriend)


module.exports = router