import User from "../../models/User"
import connectDB from "../../middleware/mongoose"
var CryptoJS = require("crypto-js");

const handler = async (req, res) => {
    if (req.method == 'POST') {
        const { name, email, phone, address, pincode, state, city } = req.body
        let user = new User({ name, email, phone, address, pincode, state, city, password: CryptoJS.AES.encrypt(req.body.password, process.env.AES_SECRET).toString() })
        await user.save()
        res.status(200).json({ success: "success" })
    } else {
        res.status(400).json({ error: "error" })
    }
}

export default connectDB(handler);