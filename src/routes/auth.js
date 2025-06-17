const express = require("express");
const authRouter = express.Router();

const{validateSignUpData} = require("../utils/validation");
const User = require("../model/user");
const bcrypt = require("bcrypt");

//SIGNUP API
authRouter.post("/signup", async (req, res) => {
    try {

        //VALIDATE ALL THE DATA
        validateSignUpData(req);

        const { firstName, lastName, emailId, password } = req.body;

        //Encypt the password
        const passwordHash = await bcrypt.hash(password, 10);
        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash
        });

        await user.save();
        res.send("Data save successfully");
    } catch (err) {
        res.status(400).send("Error : " + err.message);
    }
})

//LOGIN API
authRouter.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;

        const user = await User.findOne({ emailId: emailId })
        if (!user) {
            throw new Error("Email Invalid");
        }
        const isPasswordValid = await user.validatePassword(password);
        if (isPasswordValid) {
            const token = await user.getJWT();
            console.log(token);
            res.cookie("token",token,{expires: new Date(Date.now() + 8 * 3600000 )});
            res.send("Login Successful!!");
        } else {
            throw new Error("Invalid Credentials");
        }
    } catch (err) {
        res.status(400).send("ERROR :" + err.message)
    }
})

//LOGOUT API
authRouter.post("/logout", async (req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
    });
    res.send("Logout Successful");
})

module.exports = authRouter;