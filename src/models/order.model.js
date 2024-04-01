import mongoose, {Schema, Types} from "mongoose";


const orderSchema = new Schema(
        {
       items : [{type: Schema.Types.Mixed, require : true}],
       totalAmount: {type: Number},
       totalItems: {type: Number},
       user:{ type:Schema.Types.ObjectId, ref: 'User', required: true},
       paymentMethod: {type: String, require: true}, // lateral we write in enum type
       status:  {type: String, require: true, default: 'pending'},
       selectedAddress : {type: Schema.Types.Mixed, require : true},

    }
    )


    export const Order = mongoose.model("Order", orderSchema )
