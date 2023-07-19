import Product from "../../models/Product";
import connectDB from "../../middleware/mongoose";

const handler = async (req, res) => {
    if (req.method === "POST") {
        try {
            for (let i = 0; i < req.body.length; i++) {
                const product = new Product({
                    title: req.body[i].title,
                    slug: req.body[i].slug,
                    desc: req.body[i].desc,
                    img: req.body[i].img,
                    category: req.body[i].category,
                    tags: req.body[i].tags,
                    size: req.body[i].size,
                    color: req.body[i].color,
                    price: req.body[i].price,
                    availableQty: req.body[i].availableQty,
                });
                await product.save();
            }
            res.status(200).json({ success: "success" });
        } catch (error) {
            console.error('Error adding product:', error);
            res.status(500).json({ error: "Error adding product" });
        }
    } else {
        res.status(400).json({ error: "Bad Request" });
    }
};

export default connectDB(handler);