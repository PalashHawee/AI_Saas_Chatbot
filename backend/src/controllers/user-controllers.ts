import { Request,Response,NextFunction } from "express";
import User from "../models/User.js"
import {hash,compare} from "bcrypt"
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";

export const getAllUsers=async(
    req:Request,res:Response,next:NextFunction
) =>{
    try{
    //get all users from the database
    const users = await User.find()
    return res.status(200).json({message:"Ok",data:users})
    }catch(error){
        console.log(error);
        return res.status(200).json({message:"Ok",cause:error.message})
    
    }
}

//user signup
export const userSignup=async(
    req:Request,res:Response,next:NextFunction
) =>{
    try{
    //user sign up
    const {name,email,password}=req.body;
    const existingUser=await User.findOne({email})
    if(existingUser) return res.status(400).json({message:"User already exists"})
    const hashedPassword=await hash(password,10)
    const user=new User({name,email,password:hashedPassword})
    await user.save()

    //create token and store cookies
    //clear cookies if user signed up already
    res.clearCookie(COOKIE_NAME,{
        httpOnly: true,
        domain:'localhost',
        signed: true,
        path :'/'
    })    

    //cookie setting    
    const token=createToken(user._id.toString(),user.email,"7d") 
    
    //validation for cookie expiration (7days)
    const expires=new Date()
    expires.setDate(expires.getDate() + 7)
    

    //send the cookie to frontend
    res.cookie(COOKIE_NAME,token,
        {path: "/", 
        domain: "localhost",
        expires,
        httpOnly: true,
        signed: true
    })
    
    return res.status(201).json({message:"Ok",name:user.name, email:user.email})
    }catch(error){
        console.log(error);
        return res.status(200).json({message:"Ok",cause:error.message})
    
    }
}

//user login
export const userLogin=async(
    req:Request,res:Response,next:NextFunction
) =>{
    try{
    //user login
    const {email,password}=req.body;
    const user=await User.findOne({email})
    if(!user) return res.status(404).json({message:"User not registered"})
        
    const isPasswordCorrect=await compare(password,user.password)
    if(!isPasswordCorrect) return res.status(403).json({message:"Incorrect password"})

    //clear cookies if user logged in already
    res.clearCookie(COOKIE_NAME,{
        httpOnly: true,
        domain:'localhost',
        signed: true,
        path :'/'
    })    

    //cookie setting    
    const token=createToken(user._id.toString(),user.email,"7d") 
    
    //validation for cookie expiration (7days)
    const expires=new Date()
    expires.setDate(expires.getDate() + 7)
    

    //send the cookie to frontend
    res.cookie(COOKIE_NAME,token,
        {path: "/", 
        domain: "localhost",
        expires,
        httpOnly: true,
        signed: true
    })
    
    return res.status(201).json({message:"Ok",name:user.name, email:user.email})
    }catch(error){
        console.log(error);
        return res.status(200).json({message:"Ok",cause:error.message})
    
    }
}

export const verifyUser=async(
    req:Request,res:Response,next:NextFunction
) =>{
    try{
    //user login
    
    const user = await User.findById(res.locals.jwtData.id);

    if(!user) return res.status(404)
        .json({message:"User not registered or token malfunctioned"})

    // console.log(user._id.toString(),res.locals.jwtData.id)

    if(user._id.toString() !==res.locals.jwtData.id) {
        return res.status(403).send('Permission denied')
    }    
    
    //clear cookies if user logged in already
    
    return res.status(200).json({message:"Ok",name:user.name, email:user.email})
    }catch(error){
        console.log(error);
        return res.status(200).json({message:"Ok",cause:error.message})
    
    }
}