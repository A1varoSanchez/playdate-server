const Event = require('./../models/Event.model')

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
        .populate('participants')
        .populate({
            path: 'messages',
            populate: {
                path: 'sender',
                select: { 'username': 1, '_id': 1 }
            }
        })
        .then(response => res.json(response))
        .catch(err => next(err))
}

//EDIT EVENT
const editEvent = (req, res, next) => {

    const { eventId } = req.params
    const { name, type, description, latitude, longitude, ageGroup } = req.body

    const location = {
        type: 'Point',
        coordinates: [longitude, latitude]
    }

    Event
        .findByIdAndUpdate(eventId, { name, type, description, location, ageGroup })
        .then(response => res.json(response))
        .catch(err => next(err))
}

//DELETE EVENT
const deleteEvent = (req, res, next) => {

    const { event_id } = req.params

    Event
        .findByIdAndDelete(event_id)
        .then(() => res.sendStatus(200))
        .catch(err => next(err))
}

//JOIN EVENT
const joinEvent = (req, res, next) => {

    const { eventId } = req.body
    const { _id } = req.payload

    Event
        .findByIdAndUpdate(eventId, { $addToSet: { participants: _id } })
        .then(response => res.json(response))
        .catch(err => next(err))
}

//UNJOIN EVENT
const deleteJoin = (req, res, next) => {

    const { eventId } = req.body
    const { _id } = req.payload

    Event
        .findByIdAndUpdate(eventId, { $pull: { participants: _id } })
        .then(responses => res.json(responses))
        .catch(err => next(err))
}

//SEARCH BAR
const searchByType = (req, res, next) => {

    const searchType = req.query.type

    Event
        .find({ type: new RegExp(`^${searchType}`, 'i') })
        .then(response => res.json(response))
        .catch(err => next(err))
}

//DISPLAY CREATED EVENTS
const getMyEvents = (req, res, next) => {

    const { _id } = req.payload

    Event
        .find({ organizer: _id })
        .then(response => res.json(response))
        .catch(err => next(err))
}

//DISPLAY JOINED EVENTS
const getJoinedEvents = (req, res, next) => {

    const { _id } = req.payload

    Event
        .find({ participants: { $in: _id } })
        .then(response => res.json(response))
        .catch(err => next(err))
}

//COMMENTS EVENTS
const postCommentsEvents = (req, res, next) => {

    const { _id } = req.payload
    const { eventId, msn } = req.body
    const messages = {
        ...msn,
        sender: _id
    }
    console.log('------------------------------>Controllers', messages)
    Event
        .findByIdAndUpdate(eventId, { $push: { messages } })
        .then(response => res.json(response))
        .catch(err => next(err))
}


module.exports = {
    createEvent,
    allEvents,
    oneEvent,
    joinEvent,
    editEvent,
    deleteEvent,
    deleteJoin,
    searchByType,
    getMyEvents,
    getJoinedEvents,
    postCommentsEvents
}
