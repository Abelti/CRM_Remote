const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
require('dotenv').config();
const url = require('node:url');
const router = require("./routes/authRoutes");
const connectMongo = require('./utilities/db');

const port = process.env.PORT || 5000;


app.use(express.json());
app.use(cookieParser());
app.use('/auth', router);

app.get('/html', (req, res) => {
    res.status(200).json({
        message: "Welcome"
    });
});

//unknown routes

app.all("*", (req, res, next, error) => {
    const err = new Error (`${req.url} is not found!`);
    err.status = 404;
    res.send(err);
    next(err)
});

app.listen(port, (req, res) => {
    console.log(`Server running on port ${port}`);
    connectMongo();
});