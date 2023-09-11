import User from "../../models/User";
import connectDB from "../../middleware/mongoose";
import jsonwebtoken from "jsonwebtoken";

const handler = async (req, res) => {
  if (req.method == "POST") {
    let token = req.body.token;
    let user = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    await User.findOneAndUpdate(
      { email: user.email },
      {
        name: req.body.name,
        address: req.body.address,
        pincode: req.body.pincode,
        state: req.body.state,
        city: req.body.city,
        phone: req.body.phone,
      }
    );

    res.status(200).json({ success: true });
  } else {
    res.status(400).json({ error: "error" });
  }
};

export default connectDB(handler);
