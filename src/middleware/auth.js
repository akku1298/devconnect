const authToken = (req, res, next) => {
    console.log("authToken middleware called")
    const token = "xyza";
    const authenticate = token === "xyz";
    if (!authenticate) {
        res.send("Unauthorised access")
    } else {
        next();
    }

}

const userAuth = (req, res, next) => {
    console.log("userAuth middleware called");
    const token = "abcd";
    const authenToken = token === "abc";
    if (!authenToken) {
        res.send("User not exist");
    } else {
        next();
    }

}

module.exports = {
    authToken,
    userAuth
}