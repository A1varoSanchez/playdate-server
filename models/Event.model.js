const { Schema, model } = require("mongoose")


const eventSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'El nombre es obligatorio.']
        },
        type: {
            type: String,
            enum: ['Aire libre', 'Cultura', 'Otros', 'Parques', 'Cumpleaños', 'Deportes', 'Música', 'Talleres']
        },
        description: {
            type: String,
            minlength: [10, 'La descripción requiere un mínimo de 10 caracteres']
        },
        location: {
            type: {
                type: String
            },
            coordinates: {
                type: [Number]
            }
        },
        ageGroup: {
            type: String,
            enum: ['0-3', '3-6', '6-9', '2-5', '5-8', '8-11', '10-13', 'all'],
            required: [true, 'Selecciona rango de edad recomendado.']
        },
        participants: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
        organizer: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        messages: [{
            text: {
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

const Event = model("Event", eventSchema)

module.exports = Event


