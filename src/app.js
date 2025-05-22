const express = require("express");

const app = express();


// app.get("/user",(req, res) => {
//     res.send({ firstname:"Akansha" , lastname :"Srivastav"});
// })

// app.get("/user/:userid",(req, res) => {
//     console.log(req.params);
//     res.send({ firstname:"Akansha" , lastname :"Srivastav"});
// })

// app.get("/user", (req,res) => {
//     console.log(req.query)
//     res.send({ firstname:"Akansha" , lastname :"Srivastav"})
// })
// Express 5 mai string mai regex nhi li jayegi this is how it will work
app.get(/^\/ab+c$/, (req, res) => {
    res.send("Hola Amigo");
});

// app.post("/user" , (req, res) => {
//     res.send("Db updated successfully");
// })

// app.put("/user" , (req, res) => {
//     res.send("Db updated successfully");
// })

// app.delete("/user" , (req, res) =>{
// res.send("Data deleted")
// })

// app.use("/test", (req, res) => {
//     res.send("Hi form the test");
// })

// app.use("/getUser", (req, res) => {
//     res.send("Hi from the user");
// })

// app.use("/",(req, res) => {
//     res.send("Hi I am Akansha from the dashboard");
// })

app.listen(3000, () => {
    console.log("Server successfully running on 3000");
});