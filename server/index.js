const express = require("express");
const app = express.Router();
require('dotenv').config();


app.use(express.json());
app.use(cookie-parser);

//unknown routes

app.all('*', () => {
    const err = new Error (`${req.originalUrl} is not found!`);
    err.status = 404;
    next(err)
});

app.listen(port, (req, res) => {
    console.log(`Server running on port ${port}`);
});