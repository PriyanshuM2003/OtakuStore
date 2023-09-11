import User from "../../models/User";
import connectDB from "../../middleware/mongoose";
var CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");

const handler = async (req, res) => {
  if (req.method == "POST") {
    let user = await User.findOne({ email: req.body.email });
    const bytes = CryptoJS.AES.decrypt(user.password, process.env.AES_SECRET);
    let decryptedPass = bytes.toString(CryptoJS.enc.Utf8);
    if (user) {
      if (req.body.email == user.email && req.body.password == decryptedPass) {
        // *********************
        const expirationTimestamp =
          Math.floor(Date.now() / 1000) + 60 * 60 * 24;
        // *********************
        var token = jwt.sign(
          { email: user.email, name: user.name, phone: user.phone },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );
        res.status(200).json({
          success: true,
          token,
          email: user.email,
          name: user.name,
          phone: user.phone,
          expirationTimestamp,
        });
      } else {
        res.status(200).json({ success: false, error: "Invalid Credentials" });
      }
    } else {
      res.status(200).json({ success: false, error: "No User Found" });
    }
  } else {
    res.status(400).json({ error: "error" });
  }
};

export default connectDB(handler);
