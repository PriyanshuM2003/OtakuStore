const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    order_id: { type: String, required: true },
    // paymentInfo: { type: String, default: '' },
    products: { type: Object, required: true },
    paymentid: { type: String, default: "" },
    address: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, default: "Pending", required: true },
    deliverystatus: {
      type: String,
      default: "Order Placed & Unshipped",
      required: true,
    },
  },
  { timestamps: true }
);
mongoose.set("strictQuery", true);
export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
