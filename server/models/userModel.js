const mongoose = require('mongoose');
// Full Name
//    adress
//    unique id
//    avatar img
//    //date of employment
//    role[admin, user] 
//    department 
//    position
//    password
//    {lead}

const userSchema = mongoose.Schema({
    Full_Name: {
        type: String,
        required: [true, "Please Enter your name"]
    },
    Address: {
        country: {
            type: String,
        },
        city: {
            type: String,
        },
        state: {
            type: String,
        },
        woreda: {
            type: String,
        },
        house_no: {
            type: String,
        },
    },
    Phone_Number: {
        type: String,
        required: [true, "Please Enter your phone"]
    },
    Role: {
        type: String,
        default: "user"
    },
    Department: {
        type: String,
        required: [true, "Please Enter your department"]
    },
    Position: {
        type: String,
    },
    Avatar: {
        public_id: String,
        url: String
    },
    Password: {
        type: String,

    },
    Email: {
        type: String,
    },
    Lead: [
        {
            clientID: String
        }
    ]
}, 
{
    timeStamps: true
});

module.exports = mongoose.model('UserModel', userSchema);