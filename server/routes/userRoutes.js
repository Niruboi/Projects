const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/usermodel");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");
const Inventory = require("../models/inventoryModel");
const mongoose = require( "mongoose" );

//register new user :
router.post("/register" , async (req, res) => {
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

    //check if userType matches
    if (user.userType !== req.body.userType) {
      return res.send({
        success: false,
        message: `User is not registered as ${req.body.userType}`,
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
router.get("/get-current-user", authMiddleware , async (req, res) => {
  try {
      const user = await User.findOne({ _id: req.body.userId });
      return res.send({
        success: true,
        message: "user fetched succesfully",
        data: user,
      });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
});

//get all uniquie donars

router.get("/get-all-donors", authMiddleware, async (req, res) => {
  try {
      //get all unique donor ids
      
      const organization = new mongoose.Types.ObjectId(req.body.userId)
      const uniqueDonorIds = await Inventory.distinct("donar" , {
        organization,
      });

      const donars = await User.find({
        _id: { $in: uniqueDonorIds },
      });

      return res.send({
        success: true,
        message: "donors fetched succesfully",
        data: donars,
      });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
});

router.get("/get-all-hospitals", authMiddleware, async (req, res) => {
  try {
      //get all unique hospital ids
      
      const organization = new mongoose.Types.ObjectId(req.body.userId)
      const uniqueHospitalIds = await Inventory.distinct("hospital" , {
        organization,
      });

      const hospitals = await User.find({
        _id: { $in: uniqueHospitalIds },
      });

      return res.send({
        success: true,
        message: "hospitals fetched succesfully",
        data: hospitals,
      });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
});

router.get("/get-all-organization-of-donars", authMiddleware, async (req, res) => {
  try {
      //get all unique org for donars
      
      const donar = new mongoose.Types.ObjectId(req.body.userId)
      const uniqueOrganization = await Inventory.distinct("organization" , {
        donar,
      });

      const hospitals = await User.find({
        _id: { $in: uniqueOrganization },
      });

      return res.send({
        success: true,
        message: "organization fetched succesfully",
        data: hospitals,
      });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
});

router.get("/get-all-organization-of-hospitals", authMiddleware, async (req, res) => {
  try {
      //get all unique org for hospitals
      
      const hospital = new mongoose.Types.ObjectId(req.body.userId)
      const uniqueOrganization = await Inventory.distinct("organization" , {
        hospital ,
      });

      const hospitals = await User.find({
        _id: { $in : uniqueOrganization },
      });

      return res.send({
        success: true,
        message: "organization fetched succesfully",
        data: hospitals,
      });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
});


module.exports = router;
