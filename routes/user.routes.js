const router = require("express").Router()
const { verifyToken } = require("../middlewares/verifyToken")

const User = require("../models/User.model")

router.post('/addchild', verifyToken, (req, res, next) => {

    const { _id } = req.payload
    const { gender, birthday } = req.body

    const children = { gender, birthday }

    User
        .findByIdAndUpdate(_id, { $push: { children } })
        .then(response => res.json(response))
        .catch(err => next(err))
})

module.exports = router