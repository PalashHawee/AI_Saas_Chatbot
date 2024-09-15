import mongoose from "mongoose";
import { randomUUID } from "crypto"; 


//chat schema
const chatSchema=new mongoose.Schema({
    id:{
        type:String,
        default:randomUUID
    },
    role:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    }
})

//user schema
const userSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    chats:[chatSchema]
})

const User=mongoose.model('User',userSchema)
export default User