import Razorpay from 'razorpay';
import shortid from 'shortid';
import Order from "../../models/Order"
import Product from "../../models/Product"
import connectDB from "../../middleware/mongoose"
import pincodes from '../../pincodes.json'

const handler = async (req, res) => {
    if (req.method == 'POST') {

        if (!Object.keys(pincodes).includes(req.body.pincode)) {
            res.status(200).json({ success: false, "error": "Sorry! Delivery service is not available to this pincode", cartClear: false })
            return
        }

        let product, sumTotal = 0;
        let cart = req.body.cart;

        if (req.body.subTotal <= 0) {
            res.status(200).json({ success: false, "error": "Please try again" })
            return
        }

        for (let item in cart) {
            sumTotal += cart[item].price * cart[item].qty
            product = await Product.findOne({ slug: item })
            if (product.availableQty < cart[item].qty) {
                res.status(200).json({ success: false, "error": "Item is currently out of stock. Please try again sometime later!", cartClear: true })
                return
            }
            if (product.price != cart[item].price) {
                res.status(200).json({ success: false, "error": "The price of item in your cart has changed. Please try again", cartClear: true })
                return
            }
        }
        if (sumTotal !== req.body.subTotal) {
            res.status(200).json({ success: false, "error": "The price of item in your cart has changed. Please try again", cartClear: true })
            return
        }

        if (req.body.phone.length !== 10 || !Number.isInteger(Number(req.body.phone))) {
            res.status(200).json({ success: false, "error": "Please enter your valid phone number", cartClear: false })
            return
        }
        if (req.body.pincode.length !== 6 || !Number.isInteger(Number(req.body.pincode))) {
            res.status(200).json({ success: false, "error": "Please enter your valid pincode", cartClear: false })
            return
        }

        const razorpay = new Razorpay({
            key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
            key_secret: process.env.NEXT_PUBLIC_RAZORPAY_SECRET,
        });

        const payment_capture = 1;
        const amount = req.body.subTotal;
        const currency = "INR";
        const options = {
            amount: (amount * 100).toString(),
            currency,
            receipt: shortid.generate(),
            payment_capture,
        };

        try {
            const response = await razorpay.orders.create(options);
            let order = new Order({
                name: req.body.name,
                email: req.body.email,
                address: `${req.body.address}, ${req.body.city}, ${req.body.state}, ${req.body.pincode}`,
                order_id: response.id,
                phone: req.body.phone,
                amount: req.body.subTotal,
                products: req.body.cart,
            })
            await order.save()
            res.status(200).json({
                id: response.id,
                currency: response.currency,
                amount: response.amount,
            });
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }

    }

}
export default connectDB(handler);
