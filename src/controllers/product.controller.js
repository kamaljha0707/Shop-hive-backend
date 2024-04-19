import { Product } from '../models/product.model.js'
import {asyncHandler} from '../utils/asyncHandler.js'
import {ApiResponse} from "../utils/ApiResponse.js"
import {ApiError} from "../utils/ApiError.js"
import { isValidObjectId } from 'mongoose'

const createProduct = asyncHandler(async(req, res)=>{
    const {title, description, price, discountPrice ,discountPercentage, rating, stock, brand, category, thumbnail, images, sizes, deleted, colors, highlight} = req.body
    const calculatedDiscountPrice = Math.round(price * (1 - discountPercentage / 100));
    const createProduct = await  Product.create({
        title,
        description,
        price,
        discountPercentage,
        rating,
        stock,
        brand,
        category,
        thumbnail,
        images,
        colors,
        sizes,
        deleted,
        highlight,
        discountPrice :calculatedDiscountPrice})
    try {
        return res.status(201).json(
            new ApiResponse(200, createProduct, 'product created successfully!')
        )
    } catch (error) {
            throw new ApiError(500, "getting error while creating product !!")
    }


})

const fetchAllProducts = asyncHandler(async(req, res)=>{
    let condition = {}
    if(!req.query.admin){
        condition.deleted = {$ne:true}
    }
    
    let query = Product.find(condition);
    let totalProductsQuery = Product.find(condition);
  
  
    if (req.query.category) {
      query = query.find({ category: {$in:req.query.category.split(',')} });
      totalProductsQuery = totalProductsQuery.find({
        category: {$in:req.query.category.split(',')},
      });
    }
    if (req.query.brand) {
      query = query.find({ brand: {$in:req.query.brand.split(',')} });
      totalProductsQuery = totalProductsQuery.find({ brand: {$in:req.query.brand.split(',') }});
    }
    if (req.query._sort && req.query._order) {
      query = query.sort({ [req.query._sort]: req.query._order });
    }
  
    const totalDocs = await totalProductsQuery.count().exec();
  
    if (req.query._page && req.query._limit) {
      const pageSize = req.query._limit;
      const page = req.query._page;
      query = query.skip(pageSize * (page - 1)).limit(pageSize);
    }
  
    try {
      const docs = await query.exec();
      res.set('X-Total-Count', totalDocs);
      res.status(200).json(docs);
    } catch (err) {
      res.status(400).json(err);
    }

})

const fetchProductById = asyncHandler(async(req, res)=>{


       const {productId} = req.params;

       if(!isValidObjectId(productId)){
        throw new ApiError(400, "Invaild product id!!")
    }

     let  product = await Product.findById(productId)

      if(!product){
        throw new ApiError(400, "Product not Found!!")
    }

    return res.status(200).json(
         new  ApiResponse(200, product, "product feteched by id successfully!!")
            )


})

const updateProduct = asyncHandler(async(req, res)=>{
    const {productId}  = req.params
    
    const product = await  Product.findByIdAndUpdate(productId , req.body , {new: true})
    product.discountPrice = Math.round(product.price * (1 - product.discountPercentage / 100));
    const updateProduct = await product.save()
    try {
        return res.status(201).json(
            new ApiResponse(200, updateProduct, 'product update successfully!')
        )
    } catch (error) {
            throw new ApiError(500, "getting error while creating product !!")
    }


})



export {createProduct, fetchAllProducts, fetchProductById, updateProduct }