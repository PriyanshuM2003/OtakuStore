import Product from "../../models/Product"
import connectDB from "../../middleware/mongoose"

const handler = async (req, res) => {
    let products = await Product.find()
    let prods = {}
    for (let item of products) {
        if (item.title in prods) {
            if (!prods[item.title].color.includes(item.color) && item.availableQty > 0) {
                prods[item.title].color.push(item.color)
            }
            if (!prods[item.title].size.includes(item.size) && item.availableQty > 0) {
                prods[item.title].size.push(item.size)
            }
        } else {
            prods[item.title] = JSON.parse(JSON.stringify(item))
            if (item.availableQty > 0) {
                prods[item.title].color = [item.color]
                prods[item.title].size = [item.size]
            }
        }
    }
    res.status(200).json({ prods })
}

export default connectDB(handler);