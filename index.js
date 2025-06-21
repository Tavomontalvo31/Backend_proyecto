require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db');
const rateQuoteRoutes = require('./routes/rateQuote');
const calculateRateQuote = require('./services/quoteApiRequest');
const authRouter = require('./routes/auth')
const generateBol = require('./services/shipmentDocs');
const shipmentRoutes = require('./routes/shipment')

const app = express();

connectDB();

const port = 3000;

app.use(express.json())

app.use('/api', rateQuoteRoutes);
app.use('/api/auth', authRouter);
app.use('/api', shipmentRoutes);

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
