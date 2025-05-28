const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 50
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email address" + value);
            }
        }

    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Enter a strong password : "+ value);
            }
        }
    },
    age: {
        type: Number,
        min: 14,
    },
    gender: {
        type: String,
        validate(value) {
            if (!["male", "female", "others"].includes(value)) {
                throw new Error("Gender data is not valid")
            }
        }

    },
    photoUrl: {
        type: String,
        default: "https://www.google.com/imgres?q=%20profile%20photo%20icon&imgurl=https%3A%2F%2Fi.pinimg.com%2F1200x%2F8d%2Fff%2F49%2F8dff49985d0d8afa53751d9ba8907aed.jpg&imgrefurl=https%3A%2F%2Fin.pinterest.com%2Fpin%2F828380925233652818%2F&docid=52vR6d3yQemrmM&tbnid=5QfkR-tKXwW0DM&vet=12ahUKEwjcq5Ou08KNAxVtwTgGHWdSILIQM3oECC0QAA..i&w=512&h=512&hcb=2&ved=2ahUKEwjcq5Ou08KNAxVtwTgGHWdSILIQM3oECC0QAA",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error ("Invalid photo URL :"+value);
            }
        }
    },
    about: {
        type: String,
        default: "This is a default about section"
    },
    skills: {
        type: [String]
    },
}, { timestamps: true })

module.exports = mongoose.model("User", userSchema);