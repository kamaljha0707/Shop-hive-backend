import jwt from "jsonwebtoken"
import { ApiError } from "../utils/ApiError.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";


export const verifyJWT = asyncHandler(async(req, res , next)=>{

    try {

    //    const token =  req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
         const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE2OWFiY2ViN2UyMWMxY2M2MWMyNjkiLCJlbWFpbCI6InVzZXJrYW1hbDA3amhhQGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzEzMTE2MTY2LCJleHAiOjE3MTMyMDI1NjZ9.YDCyKCtVhYwVF1i925pgi8nSLZtUNnzsanPC7TFGG3w"
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