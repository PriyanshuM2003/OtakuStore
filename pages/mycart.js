import React, { useEffect, useState } from 'react'
import { AiFillPlusSquare, AiFillMinusSquare } from 'react-icons/ai';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head';

const MyCart = ({ cart, addToCart, removeFromCart, subTotal }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [pincode, setPincode] = useState('')
    const [state, setState] = useState('')
    const [city, setCity] = useState('')
    const [address, setAddress] = useState('')
    const [user, setUser] = useState({ value: null })

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('myuser'))
        if (user && user.token) {
            setUser(user)
            fetchData(user.token)
        }
    }, [])

    const fetchData = async (token) => {
        let data = { token: token }
        let gUser = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        let res = await gUser.json()
        console.log(res);
        setName(res.name)
        setEmail(res.email)
        setPhone(res.phone)
        setPincode(res.pincode)
        setAddress(res.address)
        setState(res.state)
        setCity(res.city)
    }


    const initializeRazorpay = () => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";

            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };

            document.body.appendChild(script);
        });
    };

    const makePayment = async () => {
        const res = await initializeRazorpay();
        if (!res) {
            alert("Razorpay SDK Failed to load");
            return;
        }

        let pdata = { cart, subTotal, email, name, address, state, city, pincode, phone };

        try {
            let data = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/razorpay`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pdata, { amount: subTotal }),
            });

            const Rres = await data.json();

            if (Rres.id) {
                var options = {
                    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
                    name: "Otaku Store",
                    currency: Rres.currency,
                    amount: Rres.amount,
                    order_id: Rres.id,
                    description: "data",
                    image: "https://pbs.twimg.com/profile_images/1345466407237128192/3TNO2kqs_400x400.jpg",
                    callback_url: `${process.env.NEXT_PUBLIC_HOST}/api/razorpayPostTransaction`,
                    prefill: {
                        name: name,
                        email: email,
                        contact: phone,
                    },
                };

                const paymentObject = new window.Razorpay(options);
                paymentObject.open();
                paymentObject.on("payment.failed", function (response) {
                    alert("Payment failed. Please try again. Contact support for help");
                });

            }
        } catch (error) {
            console.error("An error occurred during payment:", error);
            alert("An error occurred during payment. Please try again.");
        }

    };

    return (
        <>
            <section className="min-h-screen overflow-hidden">
                <Head>
                    <title>OtakuStore- MyCart</title>
                    <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
                </Head>
                <div className="container px-5 py-16 mx-auto">
                    <ToastContainer position="top-right" autoClose={1000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
                    <div className="lg:w-4/5 mx-auto flex flex-wrap justify-center items-center">
                        <div className="lg:w-4/5 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                            <div className='sideCart'>
                                <h2 className='font-bold text-purple-800 text-3xl'>My Cart</h2>
                                <div className='mt-6 mb-6 border-b-2 border-purple-500' />
                                {Object.keys(cart).length == 0 &&
                                    <div className='flex text-2xl font-semibold justify-center items-center text-purple-800'>Your Cart is empty!</div>}
                                <div className="overflow-x-auto shadow-md sm:rounded-lg">
                                    <table className="w-full text-lg text-left text-gray-500 dark:text-gray-400">
                                        {Object.keys(cart).length !== 0 &&
                                            <thead className="text-xs text-purple-900 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                <tr>
                                                    <th scope="col" className="py-3 px-6">
                                                        <span className="sr-only">Image</span>
                                                    </th>
                                                    <th scope="col" className="py-3 px-6">
                                                        Product
                                                    </th>
                                                    <th scope="col" className="py-3 px-6">
                                                        Qty
                                                    </th>
                                                    <th scope="col" className="py-3 px-6">
                                                        Price
                                                    </th>
                                                    <th scope="col" className="py-3 px-6">
                                                        Action
                                                    </th>
                                                </tr>
                                            </thead>}
                                        <tbody>
                                            {Object.keys(cart).map((k) => {
                                                return <tr key={k} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                    <td className="p-4 w-32">
                                                        <img src={cart[k].img} alt="" />
                                                    </td>
                                                    <td className="py-4 px-6 font-semibold text-purple-800 dark:text-white">
                                                        {cart[k].name}
                                                        <h1 className="flex text-gray-500 text-xs title-font font-medium">
                                                            Size:
                                                            <p className="text-purple-900 text-xs title-font font-medium ml-1">{cart[k].size}</p>
                                                        </h1>
                                                        {cart[k].variant !== "Standard" && (
                                                            <h1 className="flex text-gray-500 text-xs title-font font-medium">
                                                                Color:
                                                                <p className="text-purple-900 text-xs title-font font-medium ml-1">{cart[k].variant}</p>
                                                            </h1>
                                                        )}
                                                    </td>
                                                    <td className="py-4 px-6">
                                                        <div className='grid grid-flow-row text-purple-800'>
                                                            <div className='flex text-purple-800'>
                                                                <button onClick={() => { removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant, cart[k].img) }} className='mx-1'><AiFillMinusSquare /></button>
                                                                {cart[k].qty}
                                                                <button onClick={() => { addToCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant, cart[k].img) }} className='mx-1'><AiFillPlusSquare /></button>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-6 font-semibold text-purple-800 dark:text-white">
                                                        ₹{cart[k].price}
                                                    </td>
                                                    <td className="py-4 px-6">
                                                        <button onClick={() => { removeFromCart(k, cart[k].price, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</button>
                                                    </td>
                                                </tr>
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="flex mb-2">
                                    <a className="flex-grow text-purple-800 font-semibold border-b-2 border-purple-500 py-2 text-lg px-1">Details</a>
                                </div>
                                {user && user.token ? <p className="leading-relaxed font-semibold">{name}</p> : ''}
                                {user && user.token ? <p className="leading-relaxed font-semibold">{phone}</p> : ''}
                                {user && user.token ? <p className="leading-relaxed font-semibold">{user.email}</p> : ''}
                                {user && user.token ?
                                    address.length !== 0 ? <p className="leading-relaxed font-semibold">{address}, {city}, {state}, {pincode}</p> : <p className="leading-relaxed font-bold py-2 text-red-600">To further proceed please click on User Icon and fill out address details in My Accounct section!</p> :
                                    <p className="leading-relaxed"></p>}
                                {user && user.token ? '' : <p className="leading-relaxed font-bold text-red-600">Please Login/SignUp to continue your purchase!</p>}
                                <div className='mt-2 border-b-2 border-purple-500'></div>
                                <div className="flex mt-2 ">
                                    {Object.keys(cart).length > 0 && (
                                        <span className="title-font font-medium text-2xl text-purple-800">Total: ₹{subTotal}</span>
                                    )}
                                    {Object.keys(cart).length > 0 && address.length !== 0 && (
                                        <button onClick={makePayment} className="flex ml-auto text-white font-semibold bg-purple-900 disabled:bg-slate-500 disabled:hover:text-white border-0 py-2 px-6 focus:outline-none hover:text-yellow-400 rounded">Place Order</button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default MyCart;