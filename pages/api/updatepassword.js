import User from "../../models/User";
import connectDB from "../../middleware/mongoose";
import jsonwebtoken from "jsonwebtoken";
import CryptoJS from "crypto-js";

const handler = async (req, res) => {
  if (req.method == "POST") {
    let token = req.body.token;
    let user = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    let DBuser = await User.findOne({ email: user.email });
    const bytes = CryptoJS.AES.decrypt(DBuser.password, process.env.AES_SECRET);
    let decryptedPass = bytes.toString(CryptoJS.enc.Utf8);
    if (
      decryptedPass == req.body.password &&
      req.body.newpassword == req.body.confpassword
    ) {
      await User.findOneAndUpdate(
        { email: user.email },
        {
          password: CryptoJS.AES.encrypt(
            req.body.confpassword,
            process.env.AES_SECRET
          ).toString(),
        }
      );
      res.status(200).json({ success: true });
      return;
    }

    res.status(200).json({ success: false });
  } else {
    res.status(400).json({ error: "error" });
  }
};

export default connectDB(handler);
