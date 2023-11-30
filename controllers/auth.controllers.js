const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require("../models/User.model")

const saltRounds = 10


//SIGNUP
const signup = (req, res, next) => {
    const { username, email, password, aboutUs } = req.body

    if (password.length < 2) {
        res.status(400).json({ message: 'La contraseña debe tener mínimo dos caracteres.' })
        return
    }

    User
        .findOne({ email })
        .then((foundUser) => {

            if (foundUser) {
                res.status(400).json({ message: 'Usuario ya existente.' })
                return
            }

            const salt = bcrypt.genSaltSync(saltRounds)
            const hashedPassword = bcrypt.hashSync(password, salt)

            return User.create({ username, email, password: hashedPassword, aboutUs })
        })

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
                return;
            }

            if (bcrypt.compareSync(password, foundUser.password)) {

                const { _id, email, username } = foundUser
                const payload = { _id, email, username }

                const authToken = jwt.sign(
                    payload,
                    process.env.TOKEN_SECRET,
                    { algorithm: 'HS256', expiresIn: "6h" }
                )
                res.json({ authToken })

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