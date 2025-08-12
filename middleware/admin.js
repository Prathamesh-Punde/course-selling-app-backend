const jwt=require('jsonwebtoken');
const{JWT_ADMIN_SECRETR}=require('../config');
function usermiddleware(req,res,next){
    const token=req.headers.token;
    const decoded=jwt.verify(token,JWT_ADMIN_SECRET);
    if(decoded){
        req.id=decoded.id;
        next();
    }else{
        res.status(401).json({message:"Unauthorized"});
    }
}
module.exports={adminmiddleware};