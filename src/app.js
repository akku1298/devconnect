const express = require("express");

const app = express();

const { userAuth } = require("./middleware/auth")
const { connectDb } = require("./config/database");
const User = require("./model/user");
const {validateSignUpData}= require("./utils/validation")
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

app.use(express.json());
app.use(cookieParser());

//SIGNUP API
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

//LOGIN API
app.post("/login", async (req, res) => {
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

//PROFILE API
app.get("/profile",userAuth, async(req,res)=>{
try{

    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
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


