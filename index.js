require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db');
const rateQuoteRoutes = require('./routes/rateQuote');
const calculateRateQuote = require('./services/quoteApiRequest');

const app = express();

connectDB();

const port = 3000;

app.use(express.json())

app.use('/api', rateQuoteRoutes);

app.post('/api/data', (req, res) => {
    const result = calculateRateQuote(req.body);
    res.json(result);
});

app.get('/', (req, res) => {
    res.send("Welcome from express");
})

app.listen(port, () => {
    console.log(`Server is successfully running on http://localhost:${port}`);
})
