const express=require("express");
const router=express.Router();
const {purchaseModel}=require("../db");
const { usermiddleware } = require("../middleware/usser");

router.post("/purchase",usermiddleware,async (req,res)=>{
    const userId = req.userId;
    const courseId = req.body.courseId;
    await purchaseModel.create({
        userId,
        courseId
    });

    res.json({message:"Course purchased successfully", courseId});
});

router.get("/preview",async (req,res)=>{
 const courses=await courseModel.find({});
    res.json({courses});
});

module.exports = {courserouter: router};