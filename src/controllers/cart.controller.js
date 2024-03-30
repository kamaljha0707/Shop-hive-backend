import { Cart } from '../models/cart.model.js'
import {asyncHandler} from '../utils/asyncHandler.js'
import {ApiResponse} from "../utils/ApiResponse.js"
import {ApiError} from "../utils/ApiError.js"
import { User } from '../models/user.model.js'


const addToCart = asyncHandler(async(req, res)=>{

    const   cart  = new Cart(req.body)
      let doc = await cart.save()
         let result =  await doc.populate('product')
            return res.status(200).json(
                new ApiResponse(200, result, "cart feteched successfully!!")
            )

})


const fetchCartByUserId = asyncHandler(async(req, res)=>{

    let  {user} = req.query

    try {
    const cartItems = await Cart.find({user:user}).populate('product');

        return res.status(200).json(
            new ApiResponse(200, cartItems, "feteched user cart  successfully!!")
        )
     } catch (error) {
        throw new ApiError(500, "getting error while fetching user cart !!")
    }
})

// const deleteFromCart = asyncHandler(async(req, res)=>{
//     const {cartId}  = req.params
//       let cart = await Cart.findByIdAndDelete(cartId)
//             try {
//                 return res.status(200).json(
//                     new ApiResponse(200, cart, "cart item deleted successfully!!")
//                 )
//             } catch (error) {
//                 return new ApiError(500, 'getting error while deleting cart item')
//             }

// })

// const updateCart = asyncHandler(async(req, res)=>{
//     const {cartId}  = req.params
    
//     const cart = await  Cart.findByIdAndUpdate(cartId , req.body , {new: true})
//     try {
//         return res.status(201).json(
//             new ApiResponse(200, cart, 'cart update successfully!')
//         )
//     } catch (error) {
//             throw new ApiError(500, "getting error while updating cart !!")
//     }


// })


export {addToCart, fetchCartByUserId}