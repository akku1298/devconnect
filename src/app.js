const express = require("express");

const app = express();



app.use("/test", (req, res) => {
    res.send("Hi form the test");
})

app.use("/getUser", (req, res) => {
    res.send("Hi from the user");
})

app.use("/",(req, res) => {
    res.send("Hi I am Akansha from the dashboard");
})

app.listen(3000, () => {
    console.log("Server successfully running on 3000");
});