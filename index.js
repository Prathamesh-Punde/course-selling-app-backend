const express=require('express');
const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const JWT_SECRET='123445';
const {userrouter}=require('./routes/user');
const {courserouter}=require('./routes/course');
const {adminrouter}=require('./routes/admin');
require('dotenv').config();


const app=express();
app.use(express.json());
app.use('/user',userrouter);
app.use('/course',courserouter);
app.use('/admin',adminrouter);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
async function main(){
 await mongoose.connect(process.env.MONGO_URL);
 app.listen(3000, () => {
     console.log('Server is running on port 3000');
 });
}
main();
