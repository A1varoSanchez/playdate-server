const router = require('express').Router()

const { verifyToken } = require('../middlewares/verifyToken.guard')

const {
    createEvent,
    allEvents,
    oneEvent,
    joinEvent,
    deleteJoin,
    searchByType
} = require('../controllers/event.controllers')


router.post('/create', verifyToken, createEvent)

router.get('/getAllEvents', allEvents)

router.get("/getOneEvent/:event_id", oneEvent)

router.post("/joinEvent", verifyToken, joinEvent)

router.post('/deleteJoin', verifyToken, deleteJoin)

router.get('/searchType', searchByType)

module.exports = router