const mongoose = require("mongoose");

connectDb = async() => {
    await mongoose.connect("mongodb+srv://devconnect:p3sU9Uo679iqzgPY@devconnect.aysxwe1.mongodb.net/devconnect");

}

module.exports = {connectDb};

