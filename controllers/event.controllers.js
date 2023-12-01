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
        .populate({
            path: 'participants',
            select: { 'username': 1, '_id': 1 },
        })
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

//JOIN EVENTS
const joinEvent = (req, res, next) => {

    const { eventId } = req.body
    const { _id } = req.payload

    Event
        .findByIdAndUpdate(eventId, { $addToSet: { participants: _id } })
        .then(response => res.json(response))
        .catch(err => next(err))
}

//DELETE JOIN EVENTS
const deleteJoin = (req, res, next) => {
    const { eventId } = req.body
    const { _id } = req.payload

    Event
        .findByIdAndUpdate(eventId, { $pull: { participants: _id } })
        .then(responses => res.json(responses))
        .catch(err => next(err))
}

module.exports = {
    createEvent,
    allEvents,
    oneEvent,
    joinEvent,
    deleteJoin
}
