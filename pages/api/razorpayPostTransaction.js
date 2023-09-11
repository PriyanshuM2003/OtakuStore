import Order from "../../models/Order";
import Product from "../../models/Product";
import connectDB from "../../middleware/mongoose";
import crypto from "crypto";

const handler = async (req, res) => {
  let order;

  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body;

  const secret = process.env.NEXT_PUBLIC_RAZORPAY_SECRET;

  const generatedSignature = `${razorpay_order_id}|${razorpay_payment_id}`;

  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(generatedSignature)
    .digest("hex");

  if (razorpay_signature !== expectedSignature) {
    return res.status(400).json({ error: "Invalid signature" });
  }

  if (razorpay_signature == expectedSignature) {
    order = await Order.findOneAndUpdate(
      { order_id: razorpay_order_id },
      { status: "Paid", paymentid: razorpay_payment_id }
    );
    let products = order.products;
    for (let slug in products) {
      await Product.findOneAndUpdate(
        { slug: slug },
        { $inc: { availableQty: -products[slug].qty } }
      );
    }
  } else if (razorpay_signature !== expectedSignature) {
    order = await Order.findOneAndUpdate(
      { order_id: razorpay_order_id },
      { status: "Pending", paymentid: razorpay_payment_id }
    );
  }

  res.redirect("/order?clearCart=1&id=" + order._id, 200);
};

export default connectDB(handler);
