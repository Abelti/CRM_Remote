const express = require("express");
require("dotenv").config();
const catchAsyncError = require("../middlewares/catchAsyncError");
const userModel = require("../models/userModel");
const jwt = require('jsonwebtoken');
const sendMail = require("../utilities/sendMail");
const ErrorHandler = require("../utilities/errorHandler");
const ejs = require("ejs");
const path = require("path");
const bcrypt = require("bcryptjs");
// const activationGenerator= require ("../utilities/activation");

const registerUser = catchAsyncError(
    async (req, res, next) => {
        
        //code user register
        try {
            const { name, address, phone, department, password, email} = req.body;
            const isEmailExist = await userModel.findOne({email});
            if (isEmailExist) {
                return next(new ErrorHandler(`${email} already exists`))
            }
            const user = { name, address, phone, department, password, email};
            const activationToken = createActivationToken(user);
            const activationCode = activationToken.activationCode;
            const cName = "AB";
            const data = { user: {name}, activationCode};
            const html = await ejs.renderFile(path.join(__dirname, '../mails/activationMail.ejs'), data);
            try {
                await sendMail({
                    email: user.email,
                    subject: 'Account Activation',
                    template: "activationMail.ejs",
                    data
                });

                res.status(200).json({
                    success: true,
                    message: `please check the email ${user.email} for activation code`,
                    activationToken: activationToken.token
                });
            } catch (error) {
                return next(new ErrorHandler(error.message, 400))
            }
        } catch (error) {
            return next(new ErrorHandler(error.message, 400))
        }
    }
);

const createActivationToken = (user) => {
    const activationCode = Math.floor(1000 * Math.random() * 9000).toString();
    const token = jwt.sign({
        user,
        activationCode
    },
    process.env.ACTIVATION_TOKEN_SECRET,
    {
        expiresIn: process.env.ACTIVATION_TOKEN_EXPIRES_IN,
    });

    return {token, activationCode};
}

const activateUser = catchAsyncError(
    async (req, res, next) => {
        try {
            const {activation_token, activation_code} = req.body;
            const newUser = {user, activation_code} = jwt.verify(
                activation_token,
                process.env.ACTIVATION_TOKEN_SECRET
            );
            if(newUser.activationCode !== activation_code) {
                return next(new ErrorHandler(`Invalid activation code`, 400))
            }
            let hashedPassword = hashPassword(password);

            const { name, address, phone, department, password, email} = newUser.user;
            const myUser = await userModel.create({
                Full_Name: name,
                Address: address,
                Phone_Number: phone,
                Department: department,
                Password: hashedPassword,
                Email: email
            });

            res.status(200).json({
                success: true,
                message: "user registered!",
                newUser
            });
        } catch (error) {
            return next(new ErrorHandler(error.message, 400))
        }
    }
);

const hashPassword = (password) => {
    let hashed = bcrypt.hash(password, 9)
    return hashed;
}


module.exports = { createActivationToken, activateUser, registerUser };