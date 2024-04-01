import { Order } from '../models/order.model.js'
import {asyncHandler} from '../utils/asyncHandler.js'
import {ApiResponse} from "../utils/ApiResponse.js"
import {ApiError} from "../utils/ApiError.js"


const createOrder = asyncHandler(async(req, res)=>{

    const   order  = new Order(req.body)
      let doc = await order.save()
            return res.status(200).json(
                new ApiResponse(200, doc, "cart feteched successfully!!")
            )

})


const fetchOrderByUser = asyncHandler(async(req, res)=>{

    let  {user} = req.query

    try {
    const orders = await Order.find({user:user});

        return res.status(200).json(
            new ApiResponse(200, orders, "feteched user orders  successfully!!")
        )
     } catch (error) {
        throw new ApiError(500, "getting error while fetching order orders !!")
    }
})

const deleteOrder = asyncHandler(async(req, res)=>{
    const {orderId}  = req.params
    try {
                let order = await Order.findByIdAndDelete(orderId)
                return res.status(200).json(
                    new ApiResponse(200, order, "user order deleted successfully!!")
                )
            } catch (error) {
                return new ApiError(500, 'getting error while deleting user order')
            }

})

const updateOrder = asyncHandler(async(req, res)=>{
    const {orderId}  = req.params
    
    const order = await  Order.findByIdAndUpdate(orderId , req.body , {new: true})
    try {
        return res.status(201).json(
            new ApiResponse(200, order, 'user order update successfully!')
        )
    } catch (error) {
            throw new ApiError(500, "getting error while updating user order !!")
    }


})



export {createOrder , fetchOrderByUser, deleteOrder, updateOrder}