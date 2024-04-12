import jwt from "jsonwebtoken"
import { ApiError } from "../utils/ApiError.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";


export const verifyJWT = asyncHandler(async(req, res , next)=>{

    try {

    //    const token =  req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
         const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE2OWFiY2ViN2UyMWMxY2M2MWMyNjkiLCJlbWFpbCI6InVzZXJrYW1hbDA3amhhQGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzEyODU2MjQxLCJleHAiOjE3MTI5NDI2NDF9.E2jBDsLVT1ZESoqv6q1CQZ4GYr_z3HaC_lkiCGC0BHQ"
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