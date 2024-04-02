import { Product } from '../models/product.model.js'
import {asyncHandler} from '../utils/asyncHandler.js'
import {ApiResponse} from "../utils/ApiResponse.js"
import {ApiError} from "../utils/ApiError.js"
import { isValidObjectId } from 'mongoose'

const createProduct = asyncHandler(async(req, res)=>{
    const {title, description, price, discountPercentage, rating, stock, brand, category, thumbnail, images, deleted} = req.body
    
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
        deleted
    })
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

    let  query = Product.find(condition)
    let totalProductQuery = Product.find(condition)


    if(req.query.brand){
        query =  query.find({brand  : req.query.brand})
        totalProductQuery =  totalProductQuery.find({brand  : req.query.brand})
    }
    if(req.query.category){
        query =  query.find({category  : req.query.category})
        totalProductQuery =  totalProductQuery.find({category  : req.query.category})
    }
    if(req.query._sort && req.query._order){
        query =  query.sort({[req.query._sort]: req.query._order})
    }


    if(req.query._page && req.query._limit){
        const page = req.query._page;
       const  pageSize = req.query_limit;
        query = query.skip(pageSize*(page-1)).limit(pageSize)
    }

        const totalProduct = await totalProductQuery.count().exec()
        const products = await query.exec();

         try {
            res.set('X-Total-Count', totalProduct)
            return res.status(200).json(
                new ApiResponse(200, products, "products feteched successfully!!")
            )
         } catch (error) {
            throw new ApiError(500, "getting error while fetching products !!")
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
    try {
        return res.status(201).json(
            new ApiResponse(200, product, 'product update successfully!')
        )
    } catch (error) {
            throw new ApiError(500, "getting error while creating product !!")
    }


})



export {createProduct, fetchAllProducts, fetchProductById, updateProduct }