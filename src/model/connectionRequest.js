const mongoose= require("mongoose");
const User = require("../model/user");

const connectionRequestSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ["ignored", "interested", "accepted", "rejected"],
            message: `{VALUE} is incorrect status type`,
        },
    },
},
    { timeStamps: true }
);

//Indexes added compound Index

connectionRequestSchema.index({fromUserId: 1 , toUserId: 1});

//This pre function will always run before save method in API Call

connectionRequestSchema.pre("save", function(next){
    const connectionRequest = this;

    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error ("Cannot send connection request to yourself!");
    }
    next();
})

const ConnectionRequestModel = new mongoose.model(
    "connectionRequest",
    connectionRequestSchema
);

module.exports = ConnectionRequestModel;