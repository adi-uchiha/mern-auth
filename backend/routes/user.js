const express = require("express")
const { loginUser, signupUser } = require("../controllers/userController")

const router = express.Router()

//login Route
router.post("/login", loginUser)


//Sign up Route
router.post("/signup", signupUser)


module.exports = router