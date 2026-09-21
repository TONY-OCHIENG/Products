import express from 'express'
import { addProducts } from '../controllers/product.controller'

const productRoutes = express.Router()
productRoutes.post("/addProducts",addProducts)
export default productRoutes