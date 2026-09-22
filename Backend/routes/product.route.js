import express from 'express'
import { addProducts, deleteProduct, getAllProducts, updateProduct } from '../controllers/product.controller.js'
import { upload } from '../configs/upload.js'

const productRoutes = express.Router()
productRoutes.post("/addProducts",upload.single('image'), addProducts)
productRoutes.get("/allProducts",getAllProducts)
productRoutes.put("/updateProduct/:id",updateProduct)
productRoutes.delete("/deleteProduct/:id",deleteProduct) 
export default productRoutes