const express = require("express");
const userRouter = express.Router();

const {userAuth} = require("../middleware/auth");
const ConnectionRequest = require("../model/connectionRequest");
const User = require("../model/user")
const USER_SAFE_DATA = "firstName lastName photoUrl age gender skills";

userRouter.get("/user/requests/received", userAuth, async(req,res) => {
    try{

        const loggedInUser = req.user;

        const connectionRequest = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested",
        }).populate("fromUserId", USER_SAFE_DATA);

        res.json({
            message: "Data fetched successfully",
            data : connectionRequest,
        })

    }catch(err){
        res.status(400).send("ERROR" + err.message);
    }
});

userRouter.get("/user/connections" , userAuth, async(req,res)=>{
    try{
        const loggedInUser = req.user;
        const connectionRequest = await ConnectionRequest.find({
            $or: [
                {toUserId: loggedInUser._id, status:"accepted"},
                {fromUserId : loggedInUser._id, status: "accepted"}
            ]
        }).populate("fromUserId", USER_SAFE_DATA).populate("toUserId", USER_SAFE_DATA);

        const data = connectionRequest.map((row) => {
            if(row.fromUserId.toString() === row.loggedInUser._id.toString()){
                return row.toUserId;
            }
            return row.fromUserId;
        })

        res.json({data});

    }catch(err){
        res.status(400).send("ERROR:" + err.message);
    }
})

userRouter.get("/feed" , userAuth, async(req,res) => {
    try{
        const loggedInUser = req.user;

        const page = (req.query.page) || 1;
        let limit = (req.query.limit) || 10;
        limit = limit>50 ? 50 : limit;
        const skip = (page-1)*limit;

        const connectionRequest = await ConnectionRequest.find({
            $or:[{fromUserId: loggedInUser._id}, {toUserId: loggedInUser._id}],
        }).select("fromUserId toUserId");

        const hideUserFromFeed = new Set();
        connectionRequest.forEach((req) =>{
            hideUserFromFeed.add(req.fromUserId.toString());
            hideUserFromFeed.add(req.toUserId.toString());
        })

        const users = await User.find({
            $and: [
                {id: {$nin: Array.from(hideUserFromFeed)}},
                {_id : {$ne : loggedInUser._id}},
            ]
        }).select(USER_SAFE_DATA).skip(skip).limit(limit);

        res.json({data: users})

    }catch(err){
        res.status(400).send("ERROR:" + err.message);
    }
})
module.exports = userRouter;