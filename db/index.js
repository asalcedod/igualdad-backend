const mongoose = require('mongoose')

mongoose
    .connect("mongodb+srv://muto:OSrnIqun8SPlyqiv@clusteras.sqq9d.mongodb.net/igualdad?authSource=admin&replicaSet=atlas-vdd60w-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass%20Community&retryWrites=true&ssl=true", { useNewUrlParser: true, seUnifiedTopology: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db