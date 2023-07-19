import Admin from "../../models/Admin"
import connectDB from "../../middleware/mongoose"
import jsonwebtoken from "jsonwebtoken"

const handler = async (req, res) => {
    if (req.method == 'POST') {
        let token = req.body.token
        let admin = jsonwebtoken.verify(token, process.env.ADMIN_JWT_SECRET)
        let DBuser = await Admin.findOne({ email: admin.email })
        const { name, email, phone } = DBuser
        res.status(200).json({ name, email, phone })

    } else {
        res.status(400).json({ error: "error" })
    }
}

export default connectDB(handler);