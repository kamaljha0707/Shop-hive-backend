import mongoose, {Schema} from "mongoose";

const productSchema = new Schema(
    {
    title : {type : String, required: true, unique: true},
    description: {type :String , required : true},
    price: {type :Number , min: [0 , 'wrong min price'],max: [1000000 , 'wrong max  price'],  required : true},
    discountPercentage: {type : Number , required : true},
    discountPrice: {type : Number , required : true},
    rating: {type :Number ,  required : true},
    stock: {type : Number , required : true},
    brand: {type : String , required : true},
    category: {type : String , required : true},
    thumbnail: {type : String , required : true},
    images: { type : [String] , required : true},
    highlight: { type : [String]},
    colors:{ type : [Schema.Types.Mixed] },
    sizes:{ type : [Schema.Types.Mixed]},
    deleted: { type : Boolean , default : false},
}
)




export const Product = mongoose.model("Product", productSchema )
