import express from 'express'
import { addProducts, deleteProduct, getAllProducts, singleProduct, updateProduct } from '../controllers/product.controller.js'
import { upload } from '../configs/upload.js'

const productRoutes = express.Router()
productRoutes.post("/addProducts",upload.single('image'), addProducts)
productRoutes.get("/allProducts",getAllProducts)
productRoutes.put("/updateProduct/:id",updateProduct)
productRoutes.delete("/deleteProduct/:id",deleteProduct) 
productRoutes.get("/singleProduct/:id",singleProduct)
export default productRoutes