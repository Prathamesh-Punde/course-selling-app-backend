const express=require("express");
const zod= require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router=express.Router();
const {usermodel, purchasemodel} = require("../db");
const saltRounds = 10;
const {JWT_USER_SECRET}=require('../config')


const signupSchema = zod.object({
    email: zod.string().email("Invalid email format"),
    password: zod.string().min(6, "Password must be at least 6 characters"),
    firstname: zod.string().min(1, "First name is required"),
    lastname: zod.string().min(1, "Last name is required")
});

router.post("/signup",async (req,res)=>{
    try {
        const validatedData = signupSchema.parse(req.body);
        const {email, password, firstname, lastname} = validatedData;
        
       
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        
        await usermodel.create({
            email: email, 
            password: hashedPassword, 
            firstname: firstname, 
            lastname: lastname
        });
        
        res.json({message:"User registered successfully"});
    } catch (error) {
        if (error instanceof zod.ZodError) {
            return res.status(400).json({
                message: "Validation failed",
                errors: error.errors
            });
        }
        res.status(500).json({message: "Internal server error"});
    }
});
const signinSchema = zod.object({
    email: zod.string().email("Invalid email format"),
    password: zod.string().min(1, "Password is required")
});
router.post("/signin",async(req,res)=>{
 try {
 
        const validatedData = signinSchema.parse(req.body);
        const { email, password } = validatedData;
        
        
        const user = await usermodel.findOne({ email: email });
        
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        
        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if (isPasswordValid) {
            const token = jwt.sign({
                id: user._id,
                email: user.email
            }, JWT_USER_SECRET, { expiresIn: '24h' }); 
            
            res.json({
                message: "User signed in successfully",
                token
            });
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        if (error instanceof zod.ZodError) {
            return res.status(400).json({
                message: "Validation failed",
                errors: error.errors
            });
        }
        res.status(500).json({ message: "Internal server error" });
    }
});

router.get("/purchases",usermiddleware,async (req,res)=>{
    const userId=req.userId;
    const courses=await purchasemodel.find({userId});

    res.json(courses);
});

module.exports = {userrouter: router};