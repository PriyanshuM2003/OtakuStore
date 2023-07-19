import User from "../../models/User"
import connectDB from "../../middleware/mongoose"
import jsonwebtoken from "jsonwebtoken"

const handler = async (req, res) => {
    if (req.method == 'POST') {
        let token = req.body.token
        let user = jsonwebtoken.verify(token, process.env.JWT_SECRET)
        let DBuser = await User.findOne({ email: user.email })
        const { name, email, address, phone, pincode, state, city } = DBuser
        res.status(200).json({ name, email, address, phone, pincode, state, city })

    } else {
        res.status(400).json({ error: "error" })
    }
}

export default connectDB(handler);