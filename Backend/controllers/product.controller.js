import databaseConnection from "../database/db.js"

export const addProducts = (req, res) => {
    const { name, price, quantity} = req.body
    const { filename } = req.file

    if (!name || !price || !quantity || !filename) {
        return res.status(200).json({success: false, message: "Fill all fields"})
    }

    try {
       const addProducts = "INSERT INTO product(name,price,quantity,image) VALUES(?,?,?,?)"
       databaseConnection.query(addProducts, [name,price,quantity,filename], (error, result) => {
        if (error) return res.status(500).json({success: false, message: error})
        return res.status(201).json({success: true, message: "Product added successfully"})
       })        
    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false, message: "Internal server error"})
    }
}

export const getAllProducts = (req, res) => {
    try {
        const allProducts = "SELECT * FROM product"
        databaseConnection.query(allProducts,(error, result) => {
            if (error) return res.status(500).json({success: false, message: error})
            if (result.length > 0) {
                return res.status(200).json({success: true, result: result})
            } else {
                return res.status(200).json({success: false, message: "No products available"})
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false, message: "Internal server error"})
    }
}

export const updateProduct = (req, res) => {
    const { name, price, quantity} = req.body
    const { id } = req.params

    try {
        const updateProduct = "UPDATE product SET name = ?, price = ? quantity = ? WHERE id = ?"
        databaseConnection.query(updateProduct,[name,price,quantity,id], (error,result) => {
            if (error) return res.status(500).json({success: false, message: error})
            return res.status(200).json({success: true, message: "Product updated successfully"})
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false, message: "Internal server error"})
    }
}

export const deleteProduct = (req, res) =>{
    const { id } = req.params
    try {
        const deleteProduct = "DELETE FROM product WHERE id = ?"
        databaseConnection.query(deleteProduct,[id], (error, result) => {
            if (error) return res.status(200).json({success: false, message: error})
            return res.status(200).json({success: true, message: "Product deleted successfully"})
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false, message: "Internal server error"})
    }
}