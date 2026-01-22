import User from "../models/User.js";
import bcypt from 'bcrypt';
import jwt from 'jsonwebtoken';
<<<<<<< HEAD
=======
import Car from "../models/Car.js";
>>>>>>> 5933b73 (Made my updates after re-downloading the repo)

//Generate JWT Token

const generateToken =(userId)=>{
    const payload= userId;
    return jwt.sign(payload,process.env.JWT_SECRET)
}

// Register User
export const registerUser= async (req,res)=>{
 
    try {
        const {name,email,password}=req.body;

        if(!name || !email || !password || password.length<8){
            return res.json({success:false,message:"All fields are required"})
        }
        const userExist= await User.findOne({email})

        if(userExist){
            return res.json({success:false,message:"User already exists"})
        }

        const hashedPassword=await bcypt.hash(password,10);
        const user=await User.create({name,email,password:hashedPassword})
        const token= generateToken(user._id.toString());
        res.json({success:true,token})
    }

    catch (error) {
            console.log(error.message);
            res.json({success:false,message:error.message})
    }
}

// Login User

export const LoginUser= async (req,res) => {
    
try {
    const {email,password}=req.body
    const user=await User.findOne({email})
    if(!user){
        return res.json({success:false,message:"User does not exist"})
    }
    const isMatch= await bcypt.compare(password,user.password)
    if(!isMatch){
        return res.json({success:false,message:"Invalid Credentials"})
    }

    const token= generateToken(user._id.toString());
    res.json({success:true,token})

}
 catch (error) {
     console.log(error.message);
            res.json({success:false,message:error.message})
     }
}

//Get User using Token
export const getUserData= async (req,res) => {
       try {
             const {user}=req;
             res.json({success:true,data:user})
       } catch (error) {
        console.log(error.message);
            res.json({success:false,message:error.message})
       }
<<<<<<< HEAD
=======
}

//Function to get all car for frontend


export const getCars= async (req,res) => {
       try {
             const cars= await Car.find({isAvailable:true});
                res.json({success:true,cars})
       } catch (error) {
        console.log(error.message);
            res.json({success:false,message:error.message})
       }
>>>>>>> 5933b73 (Made my updates after re-downloading the repo)
}