import jwt from "jsonwebtoken"
import { ApiError } from "../utils/ApiError.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";


export const verifyJWT = asyncHandler(async(req, res , next)=>{

    try {

       const token =  req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        //  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjFjMTVjODY4NmU1OTU1OTI2YjliMTUiLCJlbWFpbCI6InVzZXJrYW1hbGpoYUBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MTM0NTQ3NjEsImV4cCI6MTcxMzU0MTE2MX0.l8c58ZsYLsl6_db6oYkw-m81zIsQjz_KQ4qFhi4_MOM"
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