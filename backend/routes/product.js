import express from "express";
import Product from "../models/Product.js";
import { verifyToken,verifyAdmin } from "../middleware/auth.js";

const router=express.Router();

//Create
router.post("/",verifyAdmin,async (req,res)=>{
    try{
        const newProduct=new Product(req.body);
        const savedProduct=await newProduct.save();
        res.status(201).json(savedProduct);
    }
    catch(err){
        res.status(500).json({msg:"Error creating product",error:err.message});
    }
});

//Update
router.put("/:id",verifyAdmin,async (req,res)=>{
    try{
        const updatedProduct=await Product.findByIdAndUpdate(
            req.params.id,
            {$set:req.body},
            {new:true}
        );
    if(!updatedProduct) return res.status(404).json({msg:"Product not found"});
    res.json(updatedProduct);
    }catch(err){
        res.status(500).json({ msg: "Error updating product", error: err.message });
    }
});

//Delete
router.delete("/:id",verifyAdmin,async(req,res)=>{
    try{
        const deletedProduct=await Product.findByIdAndDelete(req.params.id);
        if(!deletedProduct) return res.status(404).json({msg:"Product not found"});
        res.json({msg:"Product deleted successfully"});
    }
     catch (err) {
    res.status(500).json({ msg: "Error deleting product", error: err.message });
  }
});


//Get single product
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching product", error: err.message });
  }
});

// GET all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching products", error: err.message });
  }
});


//Get all the products based on the category
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const products = await Product.find({
      category: { $regex: new RegExp(category, "i") } // case-insensitive match
    });

    if (!products.length) {
      return res.status(404).json({ msg: "No products found in this category" });
    }

    res.json(products);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

export default router;