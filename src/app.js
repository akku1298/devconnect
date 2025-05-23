const express = require("express");

const app = express();

const { userAuth, authToken } = require("./middleware/auth")
const { connectDb } = require("./config/database");
const User = require("./model/user");

app.post("/signup", async (req, res) => {
    const user = new User({
        firstName: "Virat",
        lastName: "kohli",
        emailId: "virat@kohli.com",
        password: "virat",
        gender: "male",
        age: 30
    })

    await user.save();
    res.send("Data save successfully");
})

connectDb()
    .then(() => {
        console.log("Database connected successfully");
        app.listen(3000, () => {
            console.log("Server successfully running on 3000");
        });
    })
    .catch((err) => {
        console.log("Error occured while connecting database");
    })


