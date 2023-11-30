const router = require('express').Router()

const { verifyToken } = require('../middlewares/verifyToken');
// const User = require('../models/User.model');
const Event = require('./../models/Event.model')



router.post('/create', verifyToken, (req, res, next) => {
    const { name, type, description, latitude, longitude, ageGroup, messages } = req.body
    const { _id: organizer } = req.payload
    const location = {
        type: 'Point',
        coordinates: [longitude, latitude]
    }

    Event
        .create({ name, type, description, location, ageGroup, messages, organizer })
        .then(() => res.status(200))
        .catch(err => console.log(err))
})

router.get('/getAllEvents', (req, res, next) => {

    Event
        .find()
        .then(response => res.json(response))
        .catch(err => next(err))
})






module.exports = router