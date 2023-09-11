import Admin from "../../models/Admin";
import connectDB from "../../middleware/mongoose";
var CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");

const handler = async (req, res) => {
  if (req.method == "POST") {
    let admin = await Admin.findOne({ email: req.body.email });
    const bytes = CryptoJS.AES.decrypt(
      admin.password,
      process.env.ADMIN_AES_SECRET
    );
    let decryptedPass = bytes.toString(CryptoJS.enc.Utf8);
    if (admin) {
      if (req.body.email == admin.email && req.body.password == decryptedPass) {
        // *********************
        const expirationTimestamp =
          Math.floor(Date.now() / 1000) + 60 * 60 * 24;
        // *********************
        var token = jwt.sign(
          { email: admin.email, name: admin.name, phone: admin.phone },
          process.env.ADMIN_JWT_SECRET,
          { expiresIn: "1d" }
        );
        res.status(200).json({
          success: true,
          token,
          email: admin.email,
          name: admin.name,
          phone: admin.phone,
          expirationTimestamp,
        });
      } else {
        res.status(200).json({ success: false, error: "Invalid Credentials" });
      }
    } else {
      res.status(200).json({ success: false, error: "No admin Found" });
    }
  } else {
    res.status(400).json({ error: "error" });
  }
};

export default connectDB(handler);
