import { Brand } from '../models/brand.model.js'
import {asyncHandler} from '../utils/asyncHandler.js'
import {ApiResponse} from "../utils/ApiResponse.js"
import {ApiError} from "../utils/ApiError.js"


const fetchAllBrands = asyncHandler(async(req, res)=>{

    let  query = Brand.find({})

        const brands = await query.exec();

         try {
            return res.status(200).json(
                new ApiResponse(200, brands, "brands feteched successfully!!")
            )
         } catch (error) {
            throw new ApiError(500, "getting error while fetching brands !!")
        }


})


export {fetchAllBrands}