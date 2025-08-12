const express=require("express");
const zod= require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
const {JWT_ADMIN_SECRET} = require('../config');
const router=express.Router();
const {adminmodel, coursemodel} = require("../db");
const { adminmiddleware } = require("../middleware/admin");
const signupSchema=zod.object({
  email:zod.string().email("Invalid email format"),
  password:zod.string().min(6,"Password must be at least 6 characters"),
  firstname:zod.string().min(1,"First name is required"),
  lastname:zod.string().min(1,"Last name is required")
})


router.post("/signup",async (req,res)=>{
  try {
        const validatedData = signupSchema.parse(req.body);
        const {email, password, firstname, lastname} = validatedData;
        
       
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        await adminmodel.create({
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

router.post("/signin",async (req, res) => {
    try {
 
        const validatedData = signinSchema.parse(req.body);
        const { email, password } = validatedData;
        
        
        const admin = await adminmodel.findOne({ email: email });
        
        if (!admin) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        
        if (isPasswordValid) {
            const token = jwt.sign({
                id: admin._id,
                email: admin.email
            }, JWT_SECRET, { expiresIn: '24h' }); 
            
            res.json({
                message: "Admin signed in successfully",
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
router.post('/course',adminmiddleware ,async (req,res)=>{
    const adminId = req.id;
    const { title, description, price,imageUrl } = req.body;
    const course = await coursemodel.create({
      title,
      description,
      imageUrl,
      price,
      creatorId: adminId
    });
    res.json({ message: "Course created successfully",
      "courseid":course.courseid });
})
router.put('/course/edit',adminmiddleware,async(req,res)=>{
    const adminId = req.id;
    const { title, description, price,imageUrl,courseid } = req.body;
    const course = await coursemodel.updateOne({
      _id: courseid,
      creatorId: adminId
    }, {
      title,
      description,
      imageUrl,
      price,
      creatorId: adminId
    });
    res.json({ message: "Course created successfully",
      "courseid":course.courseid });



})
router.get('/course/all',adminmiddleware,async (req,res)=>{
   const adminId = req.id;

   const courses = await coursemodel.find({ creatorId: adminId });
   res.json({ courses });
})


module.exports={adminrouter:router};
