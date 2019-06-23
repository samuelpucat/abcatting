const mongoose = require("mongoose");
const axios = require('axios');

const Cat = require("../models/cat");

/**
 * fetches random 2 cats from catapi
 */
exports.getRandomPair = async (req, res, err) => {
    const catsRes = await axios.get(
        "https://api.thecatapi.com/v1/images/search",
        {
            params: {
                limit: 2,
                page: 0,
                order: "RAND"
            },
            headers: {
                'x-api-key': 'a1c672b0-8920-4b2b-b468-fb72575a3cf5'
            }
        }
    );

    try {
        const cats = catsRes.data.map(cat => {
            return new Cat({
                catApiId: cat.id,
                src: cat.url,
                votedFor: 0,
                totalVoted: 0
            });
        });

        let p1 = new Promise((resolve, reject) => {
            Cat.findOneAndUpdate(
                { catApiId: cats[0].catApiId },
                {
                    $setOnInsert: {
                        catApiId: cats[0].catApiId,
                        src: cats[0].src,
                        votedFor: cats[0].votedFor,
                        totalVoted: cats[0].totalVoted
                    }
                },
                {
                    upsert: true,
                    new: true
                },
                (error, results) => {
                    resolve(results);
                });
        });

        let p2 = new Promise((resolve, reject) => {
            Cat.findOneAndUpdate(
                {
                    catApiId: cats[1].catApiId
                },
                {
                    $setOnInsert: {
                        catApiId: cats[1].catApiId,
                        src: cats[1].src,
                        votedFor: cats[1].votedFor,
                        totalVoted: cats[1].totalVoted
                    }
                },
                {
                    upsert: true,
                    new: true
                },
                (error, results) => {
                    resolve(results);
                });
        });

        Promise.all([p1, p2])
            .then(values => {
                res.status(200).json({
                    message: "get random pair success",
                    result: values
                });
            }).catch(error => {
                throw error;
            });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "get random pair error",
            error: error
        });
    }
}

/**
 * returns top 10 best ranked cats, ordered by rank and datetime of last vote for the cat
 */
exports.getTopCats = async (req, res, err) => {

    

    res.status(200).json({
        message: "get top cats success",
        result: ["cat1", "cat2"],
        error: err
    })
}
