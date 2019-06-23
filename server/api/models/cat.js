const mongoose = require("mongoose");

const catSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    catApiId: String,
    src: String,
    votedFor: Number,
    totalVoted: Number,
    lastVotedFor: Date
})

module.exports = mongoose.model("Cat", catSchema);