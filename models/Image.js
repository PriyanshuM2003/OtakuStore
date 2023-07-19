const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    img: { type: String, required: true },
    category: { type: String, required: true },
}, { timestamps: true });
mongoose.set('strictQuery', true);
mongoose.models = {}
export default mongoose.models.Image || mongoose.model("Image", ImageSchema);