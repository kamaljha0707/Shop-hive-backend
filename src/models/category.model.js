import mongoose, {Schema} from "mongoose";

const categorySchema = new Schema(
    {
    value : {type : String, required: true, unique: true},
    label: {type :String , required : true, unique: true},
}
)





export const Category = mongoose.model("Category", categorySchema )
