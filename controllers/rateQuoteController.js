const rateQuote = require('../models/rateQuote');
const calculateRateQuote = require('../services/quoteApiRequest');


exports.requestRateQuote = async (req, res) => {
    try {
        const newQuote = new rateQuote(req.body);
        await newQuote.save();

        const result = calculateRateQuote(req.body);

        res.status(200).json({
            message: "Rate quote successfully generated",
            quote: result
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'An error was found while requesting a rate quote' });
    }
}

