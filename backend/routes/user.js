import express from "express";
import User from "../models/User.js";
import {verifyAdmin} from "../middleware/auth.js";

const router=express.Router();

//Get all users
router.get("/",verifyAdmin,async (req,res)=>{
    try{
        const users=await User.find().select("-password"); //exclude password
        res.json(users);
    }catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

//Update
router.put("/:id",verifyAdmin,async (req,res)=>{
    try{
        const {role}=req.body;
        const updatedUser=await User.findByIdAndUpdate(
            req.params.id,
            {role},
            {new:true}
        ).select("-password");

        if(!updatedUser) return res.status(404).json({msg:"User not found"});

        res.json({msg:"User updated",user:updatedUser});
    } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

//Delete
router.delete("/:id",verifyAdmin,async (req,res)=>{
    try{
        const deletedUser=await User.findByIdAndDelete(req.params.id);
        if(!deletedUser) return res.status(404).json({msg:"User not found"});

        res.json({msg:"User deleted successfully"});
    } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

export default router;