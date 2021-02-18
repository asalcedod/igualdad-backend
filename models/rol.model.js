const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Rol = new Schema(
    {
        code: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        description: { type: String },
        status: { type: Number, required: true, default: 1 },
    },
    { timestamps: true },
)

module.exports = mongoose.model('Rol', Rol)