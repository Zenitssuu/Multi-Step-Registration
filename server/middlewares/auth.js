import jwt from "jsonwebtoken"
import { User } from "../model/user.model.js"

export const jwtParse = async (req,res,next)=>{

    const {authorization} = req.headers;

    if(!authorization || !authorization.startsWith("Bearer ")){
        return res.status(401).json({message:"Unauthorized"});
    }

    const token = authorization.split(" ")[1];

    try {
        const decode = jwt.decode(token,process.env.JWT_SECRET_KEY);

        const email = decode.email

        const user = await User.findOne({email});

        if(!user){
            return res.status(401).json({message:"Unauthorized"});
        }

        req.userId = user._id.toString();
        
    } catch (error) {
        return res.status(401).json({message:"Unauthorized"});
    }

    next()
}