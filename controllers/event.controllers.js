const Event = require('./../models/Event.model')

// TODO: REVISAR POSIBILIDADES DE SELECT Y SORT

//CREATE EVENT
const createEvent = (req, res, next) => {

    const { name, type, description, latitude, longitude, ageGroup, messages } = req.body
    const { _id: organizer } = req.payload
    const location = {
        type: 'Point',
        coordinates: [longitude, latitude]
    }

    Event
        .create({ name, type, description, location, ageGroup, messages, organizer })
        .then(() => res.sendStatus(200))
        .catch(err => next(err))
}

//DISPLAY ALL EVENTS
const allEvents = (req, res, next) => {

    Event
        .find()
        .then(response => res.json(response))
        .catch(err => next(err))
}

//EVENT DETAILS
const oneEvent = (req, res, next) => {

    const { event_id } = req.params

    Event
        .findById(event_id)
        .populate('organizer')
        .then(response => res.json(response))
        .catch(err => next(err))
}

const joinEvent = (req, res, next) => {

    const { eventId, loggedId: participants } = req.body

    Event
        .findByIdAndUpdate(eventId, { $addToSet: { participants } })
        .then(response => res.json(response))
        .catch(err => next(err))
}

module.exports = {
    createEvent,
    allEvents,
    oneEvent,
    joinEvent
}
