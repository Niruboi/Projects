const router = require("express").Router();
const Inventory = require("../models/inventoryModel");
const User = require("../models/usermodel");
const authMiddleware = require("../middlewares/authMiddleware");
const mongoose = require( "mongoose" );

// add inventory

router.post("/add", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) throw new Error("invalid email");

    if (req.body.inventoryType === "in" && user.userType !== "donar") {
      throw new Error("this email is not registered as donar");
    }
    if (req.body.inventoryType === "out" && user.userType !== "hospital") {
      throw new Error("this email is not registered as hosipital");
    }

    if (req.body.inventoryType === "out") {

      // check if inventory is available
        const requstedGroup = req.body.bloodGroup;
        const requestedQuantity = req.body.quantity;
        const organization = new mongoose.Types.ObjectId(req.body.userId);

        const totalInofRequestedGroup = await Inventory.aggregate([
        {
          $match:{
          organization,
          inventoryType: "in",
          bloodGroup: requstedGroup,
          },
        },
        {
          $group: {
          _id: "$bloodGroup",
          total: { $sum : "$quantity" },
          },
        },
    ]);

    const totalIn = totalInofRequestedGroup[0]?.total || 0 ;


    const totalOutofRequestedGroup = await Inventory.aggregate([
      {
        $match:{
        organization,
        inventoryType: "out",
        bloodGroup: requstedGroup,
        },
      },
      {
        $group: {
        _id: "$bloodGroup",
        total: { $sum : "$quantity" },
        },
      },
  ]);

  const totalOut = totalOutofRequestedGroup[0]?.total || 0 ;

    const availableQuantityofRequstedGroup = totalIn - totalOut ; 

    if (availableQuantityofRequstedGroup < requestedQuantity ){
      throw new Error(`only ${availableQuantityofRequstedGroup} unit of ${requstedGroup} is available`);
    }
    

      req.body.hospital = user._id;
    } else {
      req.body.donar = user._id;
    }

    // add inventory

    const inventory = new Inventory(req.body);
    await inventory.save();
    res.send({
      success: true,
      message: "Inventory added successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

router.get("/get", authMiddleware, async (req, res) => {
  try {
    const inventory = await Inventory.find({ organization: req.body.userId }).sort({createdAt: -1})
      .populate("donar")
      .populate("hospital");
    return res.send({ success: true, data: inventory });
  } catch (error) {
    return res.send({ success: false, message: error.message });
  }
});

router.post("/filter", authMiddleware, async (req, res) => {
  try {
    const inventory = await Inventory.find( req.body.filters ).sort({createdAt: -1})
      .populate("donar")
      .populate("hospital").populate("organization");
    return res.send({ success: true, data: inventory });
  } catch (error) {
    return res.send({ success: false, message: error.message });
  }
});

module.exports = router;
