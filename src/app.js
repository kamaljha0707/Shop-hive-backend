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


//declration

 app.use("/", productRouter)
 app.use("/brands", brandRouter)
 app.use("/categories", categoryRouter)






export {app}