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