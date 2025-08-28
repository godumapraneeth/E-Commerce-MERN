import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router=express.Router();

//Register
router.post("/register",async (req,res)=>{
    try{const {name,email,password,role}=req.body;

    const existingUser=await User.findOne({email});
    if(existingUser) return res.status(400).json({msg:"User already exists"});

    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt);

    const newUser=new User({name,email,password:hashedPassword,role});
    const savedUser=await newUser.save();

    res.status(201).json({msg:"User registered",user:savedUser});
    }catch(err){
        res.status(500).json(err)
    }
});

//Login
router.post("/login",async (req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await User.findOne({email});
        if(!user) return res.status(400).json({msg:"User not found"});

        const isMatch=await bcrypt.compare(password,user.password);
        if (!isMatch) return res.status(400).json({msg:"Invalid credentials"});

        const token=jwt.sign(
            {id:user._id,role:user.role},
            process.env.JWT_SECRET,
            {expiresIn:"7d"}
        );
        res.json({token,user:{id:user._id,name:user.name,role:user.role}});
    }catch(err){
        res.status(500).json(err)
    }
});

export default router;