const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const objectId=Schema.Types.ObjectId;
mongoose.connect("mongodb+srv://admin:eb8qEEnHmJiFRftV@cluster0.hspqa07.mongodb.net/courseSellingApp");

const userscheme= Schema({
    email:{type:String,required:true,unique:true},
    password:String,
    firstname:String,
    lastname:String,
    
})
const adminscheme= new Schema({
    email:{type:String,required:true,unique:true},
    password:String,
    firstname:String,
    lastname:String
})
const coursescheme= new Schema({
    title:{type:String,required:true},
    description:String,
    price:{type:Number,required:true},
    instructor:{type:String,required:true},
    imgUrl:String,
    creatorId:objectId
})
const purchsecheme= new Schema({
    userId:objectId,
    courseId:objectId
})


const usermodel=mongoose.model("user",userscheme);
const adminmodel=mongoose.model("admin",adminscheme);
const coursemodel=mongoose.model("course",coursescheme);
const purchasemodel=mongoose.model("purchase",purchsecheme);
module.exports={
    usermodel,
    adminmodel,
    coursemodel,
    purchasemodel
}