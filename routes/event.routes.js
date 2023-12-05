const router = require('express').Router()

const { checkRole } = require('../middlewares/route-guard')
const { verifyToken } = require('../middlewares/verifyToken.guard')

const {
    createEvent,
    allEvents,
    userEvents,
    userJoinedEvents,
    oneEvent,
    joinEvent,
    editEvent,
    deleteEvent,
    deleteJoin,
    searchByType,
    getMyEvents,
    getJoinedEvents,
    postCommentsEvents
} = require('../controllers/event.controllers')


router.post('/create', verifyToken, createEvent)

router.get('/getAllEvents', verifyToken, allEvents)

router.get('/userEvents', verifyToken, userEvents)

router.get('/userJoinedEvents', verifyToken, userJoinedEvents)

router.get('/getOneEvent/:event_id', verifyToken, oneEvent)

router.post('/edit/:eventId', verifyToken, editEvent)

router.post('/delete/:event_id', verifyToken, deleteEvent)

router.post('/joinEvent', verifyToken, joinEvent)

router.post('/deleteJoin', verifyToken, deleteJoin)

router.get('/searchType', searchByType)

router.get('/getMyEvents', verifyToken, getMyEvents)

router.get('/getJoinedEvents', verifyToken, getJoinedEvents)

router.post('/sendComments', verifyToken, postCommentsEvents)


module.exports = router