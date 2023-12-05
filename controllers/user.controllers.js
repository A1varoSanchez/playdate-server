
const User = require("../models/User.model")

//USER PROFILE
const myProfile = (req, res, next) => {

    const { _id } = req.payload

    User
        .findById(_id)
        .populate('friends')
        .populate('friendAdd')
        .then(response => res.json(response))
        .catch(err => next(err))

}

//EDIT PROFILE
const editProfile = (req, res, next) => {

    const { _id } = req.payload
    const { username, password, aboutUs, photo } = req.body

    User
        .findByIdAndUpdate(_id, { username, password, aboutUs, photo })
        .then(response => res.json(response))
        .catch(err => next(err))

    // const { username, password, aboutUs, photo, gender, birthday } = req.body
    // const child = [{ gender, birthday }]

    // Promise.all([
    //     User.findByIdAndUpdate(_id, { username, password, aboutUs, photo }),
    //     User.findByIdAndUpdate(_id, { $pull: { children: child } })
    // ])
    //     .then(response => res.json(response))
    //     .catch(err => next(err))

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

//DELETE CHILD
const deleteChild = (req, res, next) => {

    const { _id } = req.payload
    const child = [{ gender, birthday }] = req.body

    User
        .User.findByIdAndUpdate(_id, { $pull: { children: child } })
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

const petitionFriend = (req, res, next) => {
    const { friendId } = req.body
    const { _id } = req.payload

    User
        .findByIdAndUpdate(friendId, { $addToSet: { friendAdd: { _id } } })
        .then(response => res.json(response))
        .catch(err => next(err))
}

//ADD FRIEND TO USER PROFILE
const addFriend = (req, res, next) => {

    const { friends } = req.body
    const { _id } = req.payload

    Promise.all
        ([
            User.findByIdAndUpdate(_id, { $pull: { friendAdd: friends } }),
            User.findByIdAndUpdate(_id, { $addToSet: { friends } }),
            User.findByIdAndUpdate(friends, { $addToSet: { friends: _id } }),
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
    editProfile,
    addChild,
    deleteChild,
    getAllUsers,
    addFriend,
    deleteFriend,
    petitionFriend,
}