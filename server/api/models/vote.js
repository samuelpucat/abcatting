const mongoose = require("mongoose");

const voteSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    votedForCatId: {type: mongoose.Schema.Types.ObjectId, ref: "Cat"},
    votedAgainstCatId: {type: mongoose.Schema.Types.ObjectId, ref: "Cat"},
    repeatedVote: Boolean,
    repetitionSelection: {
        type: String,
        enum: ["same", "other"],
    }
})

module.exports = mongoose.model("Vote", voteSchema);