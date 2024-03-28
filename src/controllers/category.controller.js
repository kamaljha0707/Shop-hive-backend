import { Category } from '../models/category.model.js'
import {asyncHandler} from '../utils/asyncHandler.js'
import {ApiResponse} from "../utils/ApiResponse.js"
import {ApiError} from "../utils/ApiError.js"


const fetchCategories = asyncHandler(async(req, res)=>{

    let  query = Category.find({})

        const categories = await query.exec();

         try {
            return res.status(200).json(
                new ApiResponse(200, categories, "categories feteched successfully!!")
            )
         } catch (error) {
            throw new ApiError(500, "getting error while fetching categories !!")
        }


})


export {fetchCategories}