import Admin from "../../models/Admin";
import connectDB from "../../middleware/mongoose";
var CryptoJS = require("crypto-js");

const handler = async (req, res) => {
  if (req.method == "POST") {
    const { name, email, phone } = req.body;
    let admin = new Admin({
      name,
      email,
      phone,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.ADMIN_AES_SECRET
      ).toString(),
    });
    await admin.save();
    res.status(200).json({ success: "success" });
  } else {
    res.status(400).json({ error: "error" });
  }
};

export default connectDB(handler);
