import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import productRoutes from './routes/product.route.js'
dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static('Backend/public'))
app.use("/api/products",productRoutes)

app.listen(process.env.PORT, () => {
    console.log("Server is running")
})