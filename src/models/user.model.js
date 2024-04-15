import mongoose, {Schema} from "mongoose";
import jwt  from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
    {
    email : {type : String, required: true, unique: true},
    addresses : {type: [Schema.Types.Mixe], required: true},
    role: {type :String , required : true, default: 'user'},
    password: {type: String, required: true},
    name: { type: String },
    orders : {type: [Schema.Types.Mixe]},
    refreshToken:{type: String},
    resetPasswordToken: {type:String, default: ''}
   }
)

userSchema.pre("save", async function(next) {
    if(!this.isModified('password')) return next()
    
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
   return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken =  function(){
   return  jwt.sign(
    {
        _id: this._id,
        email: this.email,
        role: this.role
    }, 
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
   ) 
}

userSchema.methods.generateRefreshToken =  function(){
   return  jwt.sign(
    {
        _id: this._id,
    }, 
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
   ) 
}





export const User = mongoose.model("User", userSchema )
