const express = require("express");
require("dotenv").config();

const registerUser = (req, res, next) => {
    const { firstName, lastName, email, capital, address } = req.body;

    res.status(200).json({
        firstName,
        lastName,
        email,
        capital,
        address,
    });
};
