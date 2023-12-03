const router = require('express').Router()

const { verifyToken } = require('../middlewares/verifyToken.guard')

const {
    createEvent,
    allEvents,
    oneEvent,
    joinEvent,
    editEvent,
    deleteJoin,
    searchByType,
    getMyEvents,
    getJoinedEvents
} = require('../controllers/event.controllers')


router.post('/create', verifyToken, createEvent)

router.get('/getAllEvents', allEvents)

router.get('/getOneEvent/:event_id', oneEvent)

router.post('/edit/:eventId', editEvent)

router.post('/joinEvent', verifyToken, joinEvent)

router.post('/deleteJoin', verifyToken, deleteJoin)

router.get('/searchType', searchByType)

router.get('/getMyEvents', verifyToken, getMyEvents)

router.get('/getJoinedEvents', verifyToken, getJoinedEvents)


module.exports = router