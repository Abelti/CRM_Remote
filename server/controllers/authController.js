const express = require("express");
require("dotenv").config();
const catchAsyncError = require("../middlewares/catchAsyncError")
// const activationGenerator= require ("../utilities/activation");

export const registerUser = catchAsyncError(
    async (req, res, next) => {
        const activationCode  = activationGenerator(user);
        //code user registe
        try {
            const { name, address, password, email} = req.body;
            const isEmailExist = await userModel.findOne({email});
            if (isEmailExist) {
                return next(new ErrorHandler(`${email} already exists`))
            }
            const user = { name, email, password}
            const data = { user: {name}, activationCode};
            const html = await ejs.renderFile(path.join(__dirname, '../mails/activationMail.ejs'));
            try {
                await sendMail({
                    email: user.email,
                    subject: 'Account Activation',
                    template: "activationMail.ejs",
                    data
                });
            } catch (error) {
                return next(new ErrorHandler(error.message, 400))
            }
        } catch (error) {
            return next(new ErrorHandler(error.message, 400))
        }
    }
);

export const activateUser = catchAsyncError(
    async (req, res, next) => {
        try {
            const {activationCode} = req.body;
            const newUser = {activationCode}
            if(newUser.activationCode !== activationCode) {
                return next(new ErrorHandler(`Invalid activation code`, 400))
            }

            // const user = await userModel.create({
            //     "model": "body"
            // });


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

export const activationGenerator = (user) => {
    const activationCode = Math.floor(1000 * Math.random() * 9000).toString();
    return activationCode;
}