import { Order } from '../models/order.model.js'
import {asyncHandler} from '../utils/asyncHandler.js'
import {ApiResponse} from "../utils/ApiResponse.js"
import {ApiError} from "../utils/ApiError.js"
import { User } from '../models/user.model.js'


const createOrder = asyncHandler(async(req, res)=>{

    const   order  = new Order(req.body)
    try {
        const doc = await order.save();
         // we can use await for this also 
        //  sendMail({to:user.email,html:invoiceTemplate(order),subject:'Order Received' })
               
        res.status(201).json(doc);
      } catch (err) {
        res.status(400).json(err);
      }

})


const fetchOrderByUser = asyncHandler(async(req, res)=>{

    let  user = req.user

    try {
    const orders = await Order.find({user:user});
        return res.status(200).json(
            new ApiResponse(200, orders, "feteched user orders  successfully!!")
        )
     } catch (error) {
        throw new ApiError(500, "getting error while fetching user orders !!")
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

const fetchAllOrders = asyncHandler(async(req, res)=>{


    let query = Order.find({deleted:{$ne:true}});
    let totalOrdersQuery = Order.find({deleted:{$ne:true}});
  
    
    if (req.query._sort && req.query._order) {
      query = query.sort({ [req.query._sort]: req.query._order });
    }
  
    const totalDocs = await totalOrdersQuery.count().exec();
  
    if (req.query._page && req.query._limit) {
      const pageSize = req.query._limit;
      const page = req.query._page;
      query = query.skip(pageSize * (page - 1)).limit(pageSize);
    }
  
    try {
      let  docs = await query.exec();
      res.set('X-Total-Count', totalDocs);
      res.status(200).json(docs);
    } catch (err) {
      res.status(400).json(err);
    }


})



export {createOrder , fetchOrderByUser, deleteOrder, updateOrder, fetchAllOrders}