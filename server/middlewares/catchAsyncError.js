const express = require('express');

const catchAsyncError = (theFunction) => (req, res, next) => {
    Promise.resolve(theFunction(req, res, next)).catch(next);
}

module.exports = catchAsyncError;