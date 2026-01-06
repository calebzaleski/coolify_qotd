const express = require('express');
const cors = require("cors");
const fs = require('fs');

const app = express();
app.use(cors({
    origin: [
        'https://main.calebzaleski.com',
        'http://calebs-MacBook-Air.local:3000',
        'http://calebs-MacBook-Air.local:3001',
        'http://calebs-MacBook-Air.local:5173'
    ]
}));app.set('trust proxy', true);
const PORT = process.env.PORT || 3001;

let dailyQuote = null;//sets the quote
let dailyQuoteDate = null;//sets the day

// Load reasons from JSON
const quotes = JSON.parse(fs.readFileSync('./quotes.json', 'utf-8'));


app.get('/daily_quote', (req, res) => {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

    // If it's a new day, pick a new random quote
    if (dailyQuoteDate !== today) {
        dailyQuote = quotes[Math.floor(Math.random() * quotes.length)];
        dailyQuoteDate = today;
    }// this checks the day that was saved above ^ against today's date and if they aren't = then it takes a new var dailyQuote and sets the new dailyQuoteDate to be today

    res.json({
        quote: dailyQuote //this sends the daily quote
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Quote of the day is running on port ${PORT}`);
});