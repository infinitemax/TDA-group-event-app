const mongoose = require("mongoose")

const eventSchema = new mongoose.Schema({
    title: String,
    location: String,
    dateAndTime: String,
    description: String,
    image: String,
    creator: { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: "User"
            }
})

module.exports.Event = mongoose.model("Event", eventSchema);