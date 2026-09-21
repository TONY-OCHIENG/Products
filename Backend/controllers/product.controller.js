
export const addProducts = (req, res) => {
    const { name, price, quantity} = req.body
    const { filename } = req.file

    if (!name || !price || !quantity || !filename) {
        return res.status(200).json({success: false, message: "Fill all fields"})
    }
}