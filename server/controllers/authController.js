const express = require("express");
require("dotenv").config();
import catchAsyncError from "../middlewares/catchAsyncError"

export const registerUser = catchAsyncError(
    async (req, res, next) => {
        //code user registe
        try {
            const { name, address, password, email} = req.body;
            const isEmailExist = await userModel.findOne({email});
            if (isEmailExist) {
                return next(new ErrorHandler(`${email} already exists`))
            }

            const data = { name, activationCode};
            const html = await ejs.renderFile(path.join(__dirname, '../mails/activationMail.ejs'));
            try {
                await sendMail({
                    email: email,
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