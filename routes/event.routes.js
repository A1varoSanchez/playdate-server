const router = require('express').Router()

const { verifyToken } = require('../middlewares/verifyToken.guard')

const {
    createEvent,
    allEvents,
    oneEvent,
    joinEvent,
    deleteJoin
} = require('../controllers/event.controllers')


router.post('/create', verifyToken, createEvent)

router.get('/getAllEvents', allEvents)

router.get("/getOneEvent/:event_id", oneEvent)

router.post("/joinEvent", verifyToken, joinEvent)

router.post('/deleteJoin', verifyToken, deleteJoin)


module.exports = router