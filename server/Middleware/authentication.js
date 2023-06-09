import jwt from  'jsonwebtoken';
import User from '../Model/userSchema.js';


const authenticate = async (req, res, next)=> {
    try{
    const token = req.cookies.jwttoken;
    if(!token)
    {
       return res.status(400).send({error:"There is no token"})
    }
    
    const verifyToken = jwt.verify(token, process.env.SECRET);
    //console.log(verifyToken);
    const rootUser = await User.findOne({_id : verifyToken._id, "tokens.token":token});
    //console.log(rootUser);
if(!rootUser)
{
   return res.status(401).json({message:"Invalid token"});
}


req.rootUser= rootUser;
 next();
 
    }
catch(err){
    res.status(401).send('Unauthorized: No token provided');
    console.log(err);
}
}
export default authenticate;