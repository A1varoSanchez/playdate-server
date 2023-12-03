const router = require("express").Router()
const { verifyToken } = require("../middlewares/verifyToken.guard")

const {
    myProfile,
    editProfile,
    addChild,
    getAllUsers,
    addFriend,
    deleteFriend,
    petitionFriend,
} = require("../controllers/user.controllers")


router.get('/profile', verifyToken, myProfile)

router.post('/editProfile', verifyToken, editProfile)

router.post('/addChild', verifyToken, addChild)

router.get('/getAllUsers', getAllUsers)

router.post('/petitionFriend', verifyToken, petitionFriend)

router.post('/addFriend', verifyToken, addFriend)

router.post('/deletFriend', verifyToken, deleteFriend)


module.exports = router