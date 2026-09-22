import express from 'express'
import { addProducts, getAllProducts } from '../controllers/product.controller.js'
import { upload } from '../configs/upload.js'

const productRoutes = express.Router()
productRoutes.post("/addProducts",upload('image'), addProducts)
productRoutes.get("/allProducts",getAllProducts)
export default productRoutes