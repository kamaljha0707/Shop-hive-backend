import express from "express";
import cors from 'cors';
import cookieParser from "cookie-parser";
import nodemailer from "nodemailer"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true,
    exposedHeaders:['X-Total-Count']
}))
app.use(cookieParser())
app.use(express.json({limit:'16kb'}))
app.use(express.urlencoded({extended: true, limit: '16kb'}))
app.use(express.static(("dist")))



// routes import
import productRouter from './routes/product.routes.js'
import brandRouter from './routes/brand.routes.js'
import categoryRouter from './routes/category.routes.js'
import authRouter from "./routes/auth.routes.js"
import userRouter from "./routes/user.routes.js"
import cartRouter from "./routes/cart.routes.js"
import orderRouter from "./routes/order.routes.js"



//declration

 app.use("/", productRouter)
 app.use("/brands", brandRouter)
 app.use("/categories", categoryRouter)
 app.use("/auth", authRouter)
 app.use("/user", userRouter)
 app.use("/cart", cartRouter)
 app.use("/orders", orderRouter)




export {app}


// const transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 587,
//     secure: false, // Use `true` for port 465, `false` for all other ports
//     auth: {
//       user: process.env.GMAIL,
//       pass: process.env.MAIL_PASSWORD,
//     },
//   });