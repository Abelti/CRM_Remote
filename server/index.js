const express = require("express");
const app = express.Router();


app.use(json());


app.listen(port, (req, res) => {
    console.log(`Server running on port ${port}`);
});