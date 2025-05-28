const express = require("express");

const app = express();

const { userAuth, authToken } = require("./middleware/auth")
const { connectDb } = require("./config/database");
const User = require("./model/user");
const {validateSignUpData}= require("./utils/validation")
const bcrypt = require("bcrypt");

app.use(express.json());

app.post("/signup", async (req, res) => {
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

//GET USER BY EMAIL
app.get("/user", async (req, res) => {
    const userEmail = req.body.emailId;
    try {
        const user = await User.findOne({ emailId: userEmail });
        if(user.lenght === 0){
            es.status(404).send("User with Email Id not found");
        }else{
            res.send(user);
        }
        
    } catch (err) {
        res.send("Something went wrong");
    }
})

//FEED API
app.get("/feed", async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (err) {
        res.status(404).send("User not found");
    }
})

//DELETE API
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete({ _id: userId });
    //const user = await User.findByIdAndDelete(userId);

    res.send("User deleted successfully");
  } catch (err) {
    res.status(400).send("Something went wrong ");
  }
});


// Update data of the user
app.patch("/user/:userId", async (req, res) => {
    const userId = req.params?.userId;
    const data = req.body;
    try {
        const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];
        const isUpdateAllowed = Object.keys(data).every((k) =>
            ALLOWED_UPDATES.includes(k)
        );
        if (!isUpdateAllowed) {
            throw new Error("Update not allowed");
        }
        if (data?.skills.length > 10) {
            throw new Error("Skills cannot be more than 10");
        }
        const user = await User.findByIdAndUpdate( userId, data, {
            returnDocument: "after",
            new:true,
            runValidators: true,
        });
        console.log(user);
        res.send("User updated successfully");
    } catch (err) {
        res.status(400).send("Something went wrong ");
    }
});


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


