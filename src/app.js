const express = require("express");

const app = express();


// app.use("/user" , (req, res, next)=>{
//     console.log("Hi from the first");
//     // res.send("Response 1 ");
//     next();
// },
// (req, res, next)=> {
//     console.log("Hi from the second");
//     // res.send("Response 2");
//     next();
// },
// (req, res, next)=> {
//     console.log("Hi from the third");
//     // res.send("Response 3");
//     next();
// },
// (req, res, next)=> {
//     console.log("Hi from the forth");
    
//      res.send("Response 4");
//     next();
// }
// )

app.post("/user" , [(req, res, next)=>{
    console.log("Hi from the first");
    // res.send("Response 1 ");
    next();
},
(req, res, next)=> {
    console.log("Hi from the second");
    // res.send("Response 2");
    next();
},
(req, res, next)=> {
    console.log("Hi from the third");
    // res.send("Response 3");
    next();
},
(req, res, next)=> {
    console.log("Hi from the forth");
    
     res.send("Response 4");
    next();
}]
)

app.listen(3000, () => {
    console.log("Server successfully running on 3000");
});