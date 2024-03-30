import mongoose, {Schema} from "mongoose";


const cartSchema = new Schema(
        {
        quantity: {type: Number, require : true},
        product:{type:Schema.Types.ObjectId, ref: 'Product', required: true},
        user:{ type:Schema.Types.ObjectId, ref: 'User', required: true}
    }
    )


    export const Cart = mongoose.model("Cart", cartSchema )

