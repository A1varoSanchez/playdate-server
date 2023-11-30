const { Schema, model } = require("mongoose")

const chatSchema = new Schema(
    {
        participants: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
        messages: [{
            content: {
                type: String
            },
            sender: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
        }],
    },
    {
        timestamps: true
    }
)


const User = model("Chat", chatSchema)

module.exports = User