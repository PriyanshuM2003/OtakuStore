import Forgot from "../../models/Forgot";
import User from "../../models/User";
import jsonwebtoken from "jsonwebtoken";
import CryptoJS from "crypto-js";

export default async function handler(req, res) {
  try {
    if (req.body.sendMail) {
      const token = jsonwebtoken.sign(
        { email: req.body.email },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );

      let forgot = new Forgot({
        email: req.body.email,
        token: token,
      });

      const mailOptions = {
        recipient: req.body.email,
        subject: "Reset Password",
        htmlContent: `We have sent you this email in response to your request to reset your password on OtakuStore.com.
          <br/><br/>
          To reset your password, please follow the link below:
          <a href="${process.env.NEXT_PUBLIC_HOST}/forgot?token=${token}">Click here to reset your password.</a>
          <br/><br/>
          We recommend that you keep your password secure and not share it with anyone. If you feel your password has been compromised, you can change it by going to your OtakuStore.com My Account Page and Change your password.
          <br/><br/>`,
      };

      const mailerResponse = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/mailer`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(mailOptions),
        }
      );

      if (mailerResponse.ok) {
        return res.status(200).json({ success: true });
      } else {
        console.error("Error sending email");
        return res
          .status(500)
          .json({ success: false, error: "Error sending email" });
      }
    } else {
      if (req.method === "POST" && req.body.token) {
        let token = req.body.token;
        let user = jsonwebtoken.verify(token, process.env.JWT_SECRET);
        let DBuser = await User.findOne({ email: user.email });

        if (!DBuser) {
          return res
            .status(404)
            .json({ success: false, error: "User not found" });
        }

        if (req.body.newpassword === req.body.confpassword) {
          const newPasswordEncrypted = CryptoJS.AES.encrypt(
            req.body.confpassword,
            process.env.AES_SECRET
          ).toString();

          await User.findOneAndUpdate(
            { email: user.email },
            { password: newPasswordEncrypted }
          );

          return res.status(200).json({ success: true });
        } else {
          return res
            .status(400)
            .json({ success: false, error: "Incorrect password" });
        }
      } else {
        return res.status(400).json({ error: "Invalid request" });
      }
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ success: false, error: "Server error" });
  }
}
