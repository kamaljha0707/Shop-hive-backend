import jwt from "jsonwebtoken"
import { ApiError } from "../utils/ApiError.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";


export const verifyJWT = asyncHandler(async(req, res , next)=>{

    try {

    //    const token =  req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
         const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE2NzI3ZDE2OTc4Yzk5MTA0ZWY5YmQiLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcxMzI0NTMwOSwiZXhwIjoxNzEzMzMxNzA5fQ.u_ZRXreOtT0TKNXN4Q_L43zSObbOmrUjH5xajQF0huU"
    if(!token){
        throw new ApiError(401, "unauthorizated ruquest")
       }

       let decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

       const user = await User.findById(decodedToken?._id).select('-password -refreshToken')

       if(!user){
        throw new ApiError(401, "Invaild Access Token")
       }
       req.user = user;
       next();
        
    } catch (error) {
        throw new ApiError(401,error?.message || 'Invalid Access Token')
         }
})