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

    const emailRecipient = order.email;
    const emailSubject = "Order Confirmation";
    const emailContent = `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Order Confirmation</title>
      <style>
    body {
      font-family: 'Arial', sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #fff;
      border-radius: 5px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }
    h2 {
      color: #333;
      text-align: center;
    }
    p {
      color: #555;
      line-height: 1.6;
    }
    .highlight {
      color: #673ab7;
      font-weight: bold;
    }
    .footer {
      margin-top: 30px;
      text-align: center;
      color: #777;
    }
  </style>
    </head>
    <body>
    <div class="container">
    <h2>Order Confirmation</h2>
    <p>Dear Customer,</p>
    <h4>Your order with Order_ID : <span class="highlight">${order.order_id}</span> has been successfully placed.<br/>Thank you for shopping with us!</h4>
          <p>If you have any questions or concerns regarding your order, please feel free to contact us.</p>
          <p>Thank you for choosing our service!</p>
        <div class="footer">
          <p>Sincerely,</p>
          <p>OTAKU STORE</p>
        </div>
        </div>
    </body>
    </html>
    `;

    const baseURL = new URL(`https://${req.headers.host}`);
    // const baseURL = new URL(`http://${req.headers.host}`);
    const mailerURL = new URL("/api/mailer", baseURL);

    await fetch(mailerURL.href, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        recipient: emailRecipient,
        subject: emailSubject,
        htmlContent: emailContent,
      }),
    });
  } else if (razorpay_signature !== expectedSignature) {
    order = await Order.findOneAndUpdate(
      { order_id: razorpay_order_id },
      { status: "Pending", paymentid: razorpay_payment_id }
    );
  }

  res.redirect("/order?clearCart=1&id=" + order._id, 200);
};

export default connectDB(handler);
