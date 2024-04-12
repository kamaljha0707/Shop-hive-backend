import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken'


let generateAccessTokenAndRefreshToken = async(userId)=>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave: false})
        return {accessToken, refreshToken}
    } catch (error) {
      throw new ApiError(500, 'something went wrong, while creating access and refresh token') 
    }
}


const createUser = asyncHandler(async(req, res)=>{
    const user =  new User(req.body);
    if(user.password & user.email == ''){
        throw new ApiError(400, 'All fields are requried!')
    }

     const existedUser = await User.findOne({
        $or: [{email: user.email}]
    })

    if(existedUser){
        throw new ApiError(409, "User with email already exists")
    }
    const docs = await  User.create(user)

    const createdUser= await User.findById(docs._id).select(
        "-password "
    )

    if(!createdUser){
        throw new ApiError(500, "getting error while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, 'user created successfully!')
    )
  
    
})

const loginUser = asyncHandler(async(req, res)=>{

    const user = req.body 
    if(!user.email){
        throw new ApiError(400, "email or password is required!")
    }

    let existedUser = await User.findOne(
        {$or: [{email: user.email}]}
    )

    if(!existedUser){
        throw new ApiError(409, "User does not exists")
    }

    let isPasswordValid = await existedUser.isPasswordCorrect(user.password)

    if(!isPasswordValid){
        throw new ApiError(400, 'Invaild credentials')
    }
    
    const {accessToken, refreshToken} = await generateAccessTokenAndRefreshToken(existedUser._id)

    let loggedInUser =  await User.findById(existedUser._id).select("-password -refreshToken")


    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(200, loggedInUser, 'User LoggedIn successfully!')
    )

})

const checkAuth = async (req, res) => {
    if (req.user) {
      res.json(req.user);
    } else {
      res.sendStatus(401);
    }
  }; 

const logoutUser = asyncHandler(async(req, res)=>{
    await  User.findByIdAndUpdate(
       req.user._id,{
           $unset:{
               refreshToken:1
           }
       },
       {new: true}
     )
   
     const options = {
       httpOnly: true,
       secure: true
   }
   return res
   .status(200)
   .clearCookie("accessToken", options)
   .clearCookie("refreshToken", options)
   .json(new ApiResponse(200,{},"User logged out"))
   })



const refreshAccessToken = asyncHandler(async(req, res)=>{
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken
    if(!incomingRefreshToken){
        throw new ApiError(401, 'unauthorized request')
    }

    try {
        const decodedToken =  jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)
    
        let user = await User.findById(decodedToken?._id)
    
        if(!user){
            throw new ApiError(401, "Invalid Refresh Token ")
        }
        
        if(incomingRefreshToken !== user?.refreshToken){
            throw new ApiError(401, "Refresh token is expired or used ")
        }
        
        const options={
            httpOnly: true,
            secure:true
        }
        const {accessToken, newRefreshToken} = await generateAccessTokenAndRefreshToken(user?._id)
    
        return res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken",newRefreshToken, options )
        .json(new ApiResponse(200, {accessToken , refreshToken: newRefreshToken}, "Access token refreshed"))
    } catch (error) {
        throw new ApiError(401, error?.message || 'Invaild refresh Token' )
    }
})



export {createUser, loginUser, logoutUser, refreshAccessToken, checkAuth}