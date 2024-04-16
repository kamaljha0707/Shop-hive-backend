import { Cart } from '../models/cart.model.js'
import {asyncHandler} from '../utils/asyncHandler.js'
import {ApiResponse} from "../utils/ApiResponse.js"
import {ApiError} from "../utils/ApiError.js"
import { User } from '../models/user.model.js'


const addToCart = asyncHandler(async(req, res)=>{
  const user = req.user;
  const cart = new Cart({...req.body,user: user._id});
  try {
    const doc = await cart.save();
    const result = await doc.populate('product');
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
})


const fetchCartByUserId = asyncHandler(async(req, res)=>{

    const  user  = req.user;
    try {
      const cartItems = await Cart.find({ user: user._id }).populate('product');
  
      res.status(200).json(cartItems);
    } catch (err) {
      res.status(400).json(err);
    }
})

const deleteFromCart = asyncHandler(async(req, res)=>{
    const {cartId}  = req.params
      let cart = await Cart.findByIdAndDelete(cartId)
            try {
                return res.status(200).json(
                    new ApiResponse(200, cart, "cart item deleted successfully!!")
                )
            } catch (error) {
                return new ApiError(500, 'getting error while deleting cart item')
            }

})

const updateCart = asyncHandler(async(req, res)=>{
    const {cartId}  = req.params
    try {
        const cart = await  Cart.findByIdAndUpdate(cartId , req.body , {new: true})
        let result =  await cart.populate('product')
        return res.status(201).json(
            new ApiResponse(200, result, 'cart update successfully!')
        )
    } catch (error) {
            throw new ApiError(500, "getting error while updating cart !!")
    }


})


export {addToCart, fetchCartByUserId, deleteFromCart, updateCart}