import { User } from '../models/user.model.js'
import {asyncHandler} from '../utils/asyncHandler.js'
import {ApiResponse} from "../utils/ApiResponse.js"
import {ApiError} from "../utils/ApiError.js"
import { isValidObjectId } from 'mongoose'


const fetchUserById = asyncHandler(async(req, res)=>{
    const  id  = req.user;
    try {
      const user = await User.findById(id);
      res.status(200).json({id:user.id,addresses:user.addresses,email:user.email,role:user.role});
    } catch (err) {
      res.status(400).json(err);
    }
})

const updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({id:user.id,addresses:user.addresses,email:user.email,role:user.role});
  } catch (err) {
    res.status(400).json(err);
  }
};

export {fetchUserById, updateUser}
