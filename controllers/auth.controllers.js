const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require("../models/User.model")


const signup = (req, res, next) => {
    const { username, email, password, aboutUs, photo } = req.body

    User
<<<<<<< HEAD
        .create({ username, email, password, aboutUs })
=======
        .findOne({ email })
        .then((foundUser) => {

            if (foundUser) {
                res.status(400).json({ message: 'Usuario ya existente.' })
                return
            }

            const salt = bcrypt.genSaltSync(saltRounds)
            const hashedPassword = bcrypt.hashSync(password, salt)

            return User.create({ username, email, password: hashedPassword, aboutUs, photo })
        })

>>>>>>> bf9a9fbdf8fc3a8d8f404bb3a0e40cb2506614cc
        .then(() => res.sendStatus(201))
        .catch(err => next(err))
}

//LOGIN
const login = (req, res, next) => {
    const { email, password } = req.body

    if (email === '' || password === '') {
        res.status(400).json({ message: "Provide email and password." });
        return;
    }

    User
        .findOne({ email })
        .then((foundUser) => {

            if (!foundUser) {
                res.status(401).json({ message: "User not found." })
                return
            }

            if (foundUser.validatePassword(password)) {
                const authToken = foundUser.signToken()
                res.status(200).json({ authToken })
            }
            else {
                res.status(401).json({ message: "Incorrect password" })
            }
        })
        .catch(err => next(err))
}

//VERIFICATION TOKEN
const verifyt = (req, res, next) => {
    const loggedUser = req.payload

    res.json({ loggedUser })
}

module.exports =
{
    signup,
    login,
    verifyt,
}