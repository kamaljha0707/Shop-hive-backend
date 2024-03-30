import mongoose, {Schema} from "mongoose";

const userSchema = new Schema(
    {
    email : {type : String, required: true, unique: true},
    addresses : {type: [Schema.Types.Mixe], required: true},
    role: {type :String , required : true, default: 'user'},
    password: {type: String, required: true},
    name: { type: String },
    orders : {type: [Schema.Types.Mixe]}
   }
)





export const User = mongoose.model("User", userSchema )
