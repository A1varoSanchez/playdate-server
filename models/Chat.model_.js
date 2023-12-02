const { Schema, model } = require("mongoose")

const chatSchema = new Schema(
    {
        participantOne: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        participantTwo: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },

        messages: [{
            content: {
                type: String
            },
            owner: {
                type: String

            }
        }],
    },
    {
        timestamps: true
    }
)


const User = model("Chat", chatSchema)

module.exports = User