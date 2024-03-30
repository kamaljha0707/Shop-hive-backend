import express from "express";
import cors from 'cors'


const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true,
    exposedHeaders:['X-Total-Count']
}))
app.use(express.json({limit:'16kb'}))
app.use(express.urlencoded({extended: true, limit: '16kb'}))
app.use(express.static(("public")))


// routes import
import productRouter from './routes/product.routes.js'
import brandRouter from './routes/brand.routes.js'
import categoryRouter from './routes/category.routes.js'
import authRouter from "./routes/auth.routes.js"
import userRouter from "./routes/user.routes.js"
import cartRouter from "./routes/cart.routes.js"



//declration

 app.use("/", productRouter)
 app.use("/brands", brandRouter)
 app.use("/categories", categoryRouter)
 app.use("/auth", authRouter)
 app.use("/user", userRouter)
 app.use("/cart", cartRouter)






export {app}