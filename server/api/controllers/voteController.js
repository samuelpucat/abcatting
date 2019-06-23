const mongoose = require("mongoose");
const Vote = require("../models/vote");
const Cat = require("../models/cat");

/**
 * logs a vote for a pair of cats
 * updates vote statistics for the cats
 */
exports.vote = async (req, res, err) => {
    const params = req.params;
    const vote = new Vote({
        _id: new mongoose.Types.ObjectId(),
        votedForCatId: params.votedForCatId,
        votedAgainstCatId: params.votedAgainstCatId,
        repeatedVote: params.repeatedVote,
        repetitionSelection: params.repetitionSelection
    });

    try {
        await vote.save();

        //await update cat 1
        await Cat.updateOne({ _id: params.votedForCatId }, { $inc: { votedFor: 1, totalVoted: 1 }, $set: { lastVotedFor: new Date() } });
        //await update cat 2
        await Cat.updateOne({ _id: params.votedAgainstCatId }, { $inc: { totalVoted: 1 } });

        res.status(200).json({
            message: "post a vote success",
            vote: vote
        });
    } catch (error) {

        res.status(500).json({
            message: "post a vote error",
            error: error
        });
    }
}

/**
 * returns voting statistics
 * total votes
 * total repeated votes
 * voting number of same/odd cat when pair is repeated
 */
exports.getTotalVotesStats = async (req, res, err) => {
    Cat.aggregate([{ $match: { totalVoted: { $gt: 0 } } }, { $project: { catApiId: 1, src: 1, total: { $divide: ["$votedFor", "$totalVoted"] } } }, { $sort: { total: -1 } }],
        function (err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log(result);
                //res.json(result);
            }
        });

}
