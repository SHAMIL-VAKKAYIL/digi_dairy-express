const mongoose = require('mongoose')


const diarySchema = mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    userid: {
        type: String,
        required: true
    },
    upDate: {
        type: String,
        default: () => new Date().toLocaleDateString()
    }
})

module.exports = mongoose.model('diary', diarySchema)