const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema(
    {
        username: { type: String },
        email: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        lastname: { type: String, required: true },
        country: { type: String, required: true },
        city: { type: String, required: true },
        department: { type: String, required: true },
        password: { type: String },
        imageUrl: { type: String, default: "" },
        status: { type: Number, required: true, default: 1 },
    },
    { timestamps: true },
)

User.methods.setImageUrl = function(filename) {
    this.imageUrl = `http://localhost:3000/public/${filename}`
}

module.exports = mongoose.model('User', User)