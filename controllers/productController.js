const {validationResult } = require('express-validator');
const {createProductValidation, updateProductValidation } = require('../utils/validation');
const Product =require('../models/Product');
exports.createProduct = async (req, res) => {
  //validate request body
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(422).json({ errors: errors.array() });
  }
  try{
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllProducts =async(req, res)=>{
    try{
      const products =await Product.find();
      res.status(200).json(products);
    }catch (err){
      res.status(400).json({ error: err.message });
    }
  };

  exports.updateProduct=async (req, res)=>{
    try{
      //validate request body using updateProductValidation middleware
      const errors = validationResult(req);
      if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()});
      }
      const{ id }=req.params;
      const updatedProduct = await Product.findByIdAndUpdate(id, req.body,{new: true });
      if(!updatedProduct){
        return res.status(404).json({error: 'Product not found' });
      }
      res.status(200).json(updatedProduct);
    }catch(err){
      res.status(400).json({ error: err.message });
    }
  };

  exports.searchProducts = async (req, res) => {
    try {
      const { keyword } = req.query.keyword;
      if (!keyword) {
        return res.status(400).json({ error: 'Keyword is required' });
      }
      
      // Perform case-insensitive search using regular expression
      const searchRegex = new RegExp(keyword, 'i');
      
      // Search for products with matching name or description
      const products = await Product.find({
        $or: [
          { name: { $regex: searchRegex } },
          { description: { $regex: searchRegex } }
        ]
      });
  
      if (products.length === 0) {
        return res.status(404).json({ error: 'No products found' });
      }
  
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  

const mongoose=require('mongoose');

exports.deleteProduct = async (req, res) => {
  try{
    const { id } = req.params;
    if(!id || !mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error:'Invalid Product ID' });
    }
    const deletedProduct = await Product.findByIdAndDelete(id);
    if(!deletedProduct) {
      return res.status(404).json({error: 'Product not found' });
    }
    res.status(204).send();
  } catch(err){
    res.status(500).json({ error: err.message });
  }
};

exports.getProductById= async (req, res) => {
    try{
      const{id}= req.params;
      if(!id){
        return res.status(400).json({error: 'Product ID is required' });
      }
      const product=await Product.findById(id);
      if(!product){
        return res.status(404).json({ error:'Product not found' });
      }
      res.status(200).json(product);
    }
    catch(err){
      res.status(400).json({ error: err.message });
    }
  };
  