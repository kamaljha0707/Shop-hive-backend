import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const createUser = asyncHandler(async(req, res)=>{
    const user =  new User(req.body);

   
        const docs = await user.save();
        try {
            return res.status(201).json(
                new ApiResponse(200, {id:docs.id, role:docs.role}, 'user created successfully!')
            )
        } catch (error) {
            throw new ApiError(500, error, 'getting error while signup!!')
        }
    
})

const loginUser = asyncHandler(async(req, res)=>{
    const user = await User.findOne({email: req.body.email})
   if(!user){
     throw new ApiError(400, 'user not found!')
   } else if (user.password === req.body.password){
    return res.status(201).json(
        new ApiResponse(200, {id:user.id, role: user.role}, 'user logged in successfully!!')
    ) 
   }else{
    throw new ApiError(400 ,'invaild crendentials!')

   }

    
})


export {createUser, loginUser}