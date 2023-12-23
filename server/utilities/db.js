const mongoose = require('mongoose');
require('dotenv').config();

const connectMongo = async () => {
    try {
        await mongoose.connect(process.env.DB_URL).then((data) => {
            console.log(`Database connected to ${data.connection.host}`)
        });
    } catch (error) {
        console.log(error.message);
        setTimeout(connectMongo, 5000);
        process.exit(1);
    }
}

module.exports = connectMongo;