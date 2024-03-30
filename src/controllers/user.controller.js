import { User } from '../models/user.model.js'
import {asyncHandler} from '../utils/asyncHandler.js'
import {ApiResponse} from "../utils/ApiResponse.js"
import {ApiError} from "../utils/ApiError.js"
import { isValidObjectId } from 'mongoose'


const fetchUserById = asyncHandler(async(req, res)=>{
    const {userId} = req.params
    const user = await  User.findByIdAndUpdate(userId, 'name email id')
    try {
        return res.status(201).json(
            new ApiResponse(200, user, 'user created successfully!')
        )
    } catch (error) {
            throw new ApiError(500, "getting error while creating user !!")
    }

})

const updateUser = asyncHandler(async(req, res)=>{
    const {userId} = req.params
    const user = await  User.findByIdAndUpdate(userId, req.body, {new: true})
    try {
        return res.status(201).json(
            new ApiResponse(200, user, 'user update successfully!')
        )
    } catch (error) {
            throw new ApiError(500, "getting error while updating  user !!")
    }


})

export {updateUser, fetchUserById}
