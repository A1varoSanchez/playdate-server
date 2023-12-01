const { Schema, model } = require("mongoose")


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
      required: [true, 'La contraseña es obligatoria.']
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
    chats: [{
      type: Schema.Types.ObjectId,
      ref: 'Chat'
    }],
  },
  {
    timestamps: true
  }
)

const User = model("User", userSchema)

module.exports = User