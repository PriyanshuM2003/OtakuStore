import Image from "../../models/Image";
import connectDB from "../../middleware/mongoose";

const handler = async (req, res) => {
    if (req.method === "POST") {
        try {
            for (let i = 0; i < req.body.length; i++) {
                const image = new Image({
                    img: req.body[i].img,
                    category: req.body[i].category,
                });
                await image.save();
            }
            res.status(200).json({ success: "success" });
        } catch (error) {
            console.error('Error adding image:', error);
            res.status(500).json({ error: "Error adding image" });
        }
    } else {
        res.status(400).json({ error: "Bad Request" });
    }
};

export default connectDB(handler);