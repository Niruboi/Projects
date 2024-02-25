const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/usermodel");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");

//register new user :
router.post("/register", async (req, res) => {
  try {
    //check if user exist
    console.log(req.body.email);
    const userExist = await User.findOne({ email: req.body.email });
    if (userExist) {
      return res.send({
        success: false,
        message: "User already exists",
      });
    }

    // hash password:
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashpassword;

    //save new user
    const user = new User(req.body);
    await user.save();

    return res.send({
      success: true,
      message: "User registered succesfully",
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
      
    });
  }
});

//login user :
router.post("/login", async (req, res) => {
  try {
    //check if user exist
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.send({
        success: false,
        message: "User not found",
      });
    }
    // verify the password
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    
    if (!validPassword) {
      return res.send({
        success: false,
        message: "incorect Password",
      });
    }
    const token = jwt.sign({ userId: user._id }, process.env.jwt_secret, {
      expiresIn: "1d",
    });
    
    return res.send({
      success: true,
      message: "User Logged in Succesfully",
      data: token,
    });
  
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
});

//get current user
router.get("/getCurrentUser",authMiddleware, async (req, res) => {
  try {
      const user = await User.findOne({_id: req.body.userId});
      console.log(user);
      res.send({
        success: true,
        message: "user fetched succesfully",
        data: user,
      });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
})

module.exports = router;
