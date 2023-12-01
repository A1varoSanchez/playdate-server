const router = require("express").Router()
const { verifyToken } = require("../middlewares/verifyToken.guard")

const {
    myProfile,
    addChild,
    getAllUsers,
    addFriend,
    deleteFriend,
    petitionFriend,
} = require("../controllers/user.controllers")


router.get('/perfil', verifyToken, myProfile)

router.post('/addchild', verifyToken, addChild)

router.get('/getAllUser', getAllUsers)

router.post('/petitionFriend', verifyToken, petitionFriend)

router.post('/addFriend', verifyToken, addFriend)

router.post('/deletFriend', verifyToken, deleteFriend)


module.exports = router