import Forgot from "../../models/Forgot";
import User from "../../models/User";
import connectDB from "../../middleware/mongoose";
import jsonwebtoken from "jsonwebtoken";
import CryptoJS from "crypto-js";
export default async function handler(req, res) {
  if (req.body.sendMail) {
    let token = `agedrlakjgbnkashdkjdsbfgjkisdfgdjbfisak`;
    let forgot = new Forgot({
      email: req.body.email,
      token: token,
    });

    let email = `We have sent you this email in response to your request to reset your password on OtakuStore.com.
        
        <br/><br/>
        
        To reset your password , please follow the link below:
        
    <a href="https://ostakustore.com/forgot?token=${token}">Click here to reset your password.</a>

    <br/><br/>

    We recommend that you keep your password secure and not share it with anyone.If you feel your password has been compromised, you can change it by going to your OtakuStore.com My Account Page and Change your password .

    <br/><br/>`;
  } else {
    if (req.method == "POST") {
      let token = req.body.token;
      let user = jsonwebtoken.verify(token, process.env.JWT_SECRET);
      let DBuser = await User.findOne({ email: user.email });
      const bytes = CryptoJS.AES.decrypt(
        DBuser.password,
        process.env.AES_SECRET
      );
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
  }

  res.status(200).json({ success: true });
}
