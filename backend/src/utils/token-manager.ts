import jwt from "jsonwebtoken";
import {Request, Response,NextFunction} from "express"
import { COOKIE_NAME } from "./constants.js";

export const createToken=(id:string,email:string,expiresIn:string)=>{
    const payload={id,email}
    const token =jwt.sign(payload,process.env.JWT_SECRET,{
        expiresIn,
    })
    return token
}

//middleware for token verification for login
export const verifyToken=(
    req:Request,
    res:Response,
    next:NextFunction)=>{
        const token=req.signedCookies[`${COOKIE_NAME}`]
        if(!token || token.trim()===''){
            return res.status(401).json({
                message:"Token Not Found",
            })
        }
        return new Promise((resolve, reject) =>{
            return jwt.verify(token,process.env.JWT_SECRET,(err,success)=>{
                if(err){
                    reject(err)
                    return res.status(401).json({
                        message:"Token Expired",
                    })
                }else{
                    
                    resolve(success)
                    res.locals.jwtData=success
                    return next()
                }
            })
        })
    }