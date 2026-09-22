import express from 'express'
import { addProducts } from '../controllers/product.controller.js'
import { upload } from '../configs/upload.js'

const productRoutes = express.Router()
productRoutes.post("/addProducts",upload('image'), addProducts)
export default productRoutes