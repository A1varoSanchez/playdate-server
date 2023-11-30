const { response } = require("express")
const User = require("../models/User.model")

//USER PROFILE
const myProfile = (req, res, next) => {

    const { _id } = req.payload

    User
        .findById(_id)
        .populate('friends')
        .then(response => res.json(response))
        .catch(err => next(err))

}

//ADD CHILD TO USER PROFILE
const addChild = (req, res, next) => {

    const { _id } = req.payload
    const children = { gender, birthday } = req.body

    User
        .findByIdAndUpdate(_id, { $push: { children } })
        .then(response => res.json(response))
        .catch(err => next(err))
}

//GET ALL USERS
const getAllUsers = (req, res, next) => {

    User
        .find()
        .then(response => res.json(response))
        .catch(err => next(err))
}

//ADD FRIEND TO USER PROFILE
const addFriend = (req, res, next) => {

    // TODO: COGER ID DEL LOGGED USER A TYRAVES DEL VERIFYTOKEN Y DE REQ.PAYLOAD
    const { friends } = req.body
    const { _id } = req.payload

    Promise.all
        ([
            User.findByIdAndUpdate(_id, { $addToSet: { friends } }),
            User.findByIdAndUpdate(friends, { $addToSet: { friends: _id } })
        ])
        .then(responses => res.json(responses))
        .catch(err => next(err))
}

//DELETE FRIEND TO USER PROFILE
const deleteFriend = (req, res, next) => {
    const { friendId, } = req.body
    const { _id } = req.payload

    Promise.all
        ([
            User.findByIdAndUpdate(_id, { $pull: { friends: friendId } }),
            User.findByIdAndUpdate(friendId, { $pull: { friends: _id } })
        ])
        .then(responses => res.json(responses))
        .catch(err => next(err))
}

module.exports = {
    myProfile,
    addChild,
    getAllUsers,
    addFriend,
    deleteFriend

}