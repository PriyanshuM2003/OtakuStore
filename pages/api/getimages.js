import Image from "../../models/Image";
import connectDB from "../../middleware/mongoose";

const handler = async (req, res) => {
  try {
    const images = await Image.find({});
    res.status(200).json(images);
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).json({ error: "Error fetching images" });
  }
};

export default connectDB(handler);
