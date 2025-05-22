const express = require("express");

const app = express();

const { userAuth, authToken } = require("./middleware/auth")

app.use("/admin", authToken);

app.get("/user/getUser", userAuth, (req, res) => {
    res.send("User data is there");
})

app.get("/admin/getAllData", (req, res) => {
    res.send("All data sent");
})

app.get("/admin/deleteData", (req, res) => {
    res.send("All data delete");
})


app.listen(3000, () => {
    console.log("Server successfully running on 3000");
});