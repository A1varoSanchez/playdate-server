const { Schema, model } = require("mongoose")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'El email es obligatorio.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'La contraseña es obligatoria.'],
      minlength: [2, 'La contraseña debe tener al menos 2 caracteres.']
    },
    username: {
      type: String,
      required: [true, 'El nombre de usuario es obligatorio.'],
      minlength: [3, 'El usuario debe tener al menos 3 caracteres.']
    },
    children: [{
      gender: {
        type: String,
        enum: ['niño', 'niña']
      },
      birthday: {
        type: Date,
      },
    }],
    aboutUs: {
      type: String,
    },
    photo: {
      type: String
    },
    friends: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
    role: {
      type: String,
      enum: ['USER', 'ADMIN'],
      default: 'USER'
    },
    friendAdd: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
  },
  {
    timestamps: true
  }
)

userSchema.pre('save', function (next) {

  const saltRounds = 10
  const salt = bcrypt.genSaltSync(saltRounds)
  const hashedPassword = bcrypt.hashSync(this.password, salt)
  this.password = hashedPassword

  next()
})

userSchema.methods.signToken = function () {
  const { _id, username, role } = this
  const payload = { _id, username, role }

  const authToken = jwt.sign(
    payload,
    process.env.TOKEN_SECRET,
    { algorithm: 'HS256', expiresIn: "6h" }
  )

  return authToken
}

userSchema.methods.validatePassword = function (candidatePassword) {
  return bcrypt.compareSync(candidatePassword, this.password)
}

const User = model("User", userSchema)

module.exports = User




