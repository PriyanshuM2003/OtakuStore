import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import { MdArrowForward } from 'react-icons/md';
import { BiArrowBack } from 'react-icons/bi';

const Orders = () => {
    const router = useRouter();
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const totalItems = orders.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const shouldShowPagination = totalItems > itemsPerPage;

    const fetchOrders = async () => {
        let ord = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/myorders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: JSON.parse(localStorage.getItem('myuser')).token }),
        })
        let res = await ord.json()
        const sortedOrders = res.orders.sort((a, b) => {
            const dateA = new Date(a.createdAt);
            const dateB = new Date(b.createdAt);
            return dateB - dateA;
        });

        setOrders(sortedOrders);
    }

    useEffect(() => {
        if (!localStorage.getItem('myuser')) {
            router.push('/')
        } else {
            fetchOrders()
        }
    }, [])

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = orders.slice(indexOfFirstItem, indexOfLastItem);
    const scrollToTop = () => {
        window.scrollTo(0, 0);
    };

    return <>
        <Head>
            <title>Otaku Store- MyOrders</title>
            <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
        </Head>
        <div className="min-h-screen overflow-x-auto py-8 px-24 mt-6 mx-auto">
            <h1 className='text-3xl text-purple-800 font-bold'>My Orders</h1>
            <div className='mt-4 mb-4 border-b-2 border-purple-500' />
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="py-3 px-6">
                            Order ID
                        </th>
                        <th scope="col" className="py-3 px-6">
                            <span className="sr-only">Image</span>
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Products
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Qty
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Price
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((order) => (
                        <React.Fragment key={order._id}>
                            {Object.values(order.products).map((product) => (
                                <tr key={product} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                                        <Link href={`/order?id=${order._id}`} legacyBehavior>
                                            <h1 className='text-lg text-purple-800'>#{order.order_id}</h1>
                                        </Link>
                                        <p className="flex text-xs title-font tracking-widest">Order placed on:
                                            <p className='text-xs title-font text-green-600 tracking-widest ml-1'>
                                                {new Date(order.createdAt).toLocaleDateString("en-IN", { year: 'numeric', month: 'long', day: 'numeric' })}
                                            </p>
                                        </p>
                                        <p className="flex text-xs title-font tracking-widest">Order Status:<p className='text-xs title-font text-green-600 tracking-widest ml-1'>{order.status}</p></p>
                                    </td>
                                    <td className="p-4 w-32">
                                        <Link href={`/order?id=${order._id}`} legacyBehavior>
                                            <div><img src={product.img} /></div>
                                        </Link>
                                    </td>
                                    <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                                        <Link href={`/order?id=${order._id}`} legacyBehavior>
                                            <h1 className='text-purple-800 text-lg'>{product.name}</h1>
                                        </Link>
                                        <h1 className="flex text-gray-500 text-xs title-font font-medium">
                                            Size:
                                            <p className="text-purple-900 text-xs title-font font-medium ml-1">{product.size}</p>
                                        </h1>
                                        {product.variant !== "Standard" && (
                                            <h1 className="flex text-gray-500 text-xs title-font font-medium">
                                                Color:
                                                <p className="text-purple-900 text-xs title-font font-medium ml-1">{product.variant}</p>
                                            </h1>
                                        )}
                                    </td>
                                    <td className="py-4 px-6 font-semibold text-purple-800 dark:text-white">{product.qty}</td>
                                    <td className="py-4 px-6 font-semibold text-purple-800 dark:text-white">
                                        ₹{product.price} X {product.qty} = ₹{product.price * product.qty}
                                    </td>
                                </tr>
                            ))}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
        {shouldShowPagination && (
            <div className='flex justify-center my-4'>
                <nav>
                    <ul className="flex cursor-pointer">
                        <li>
                            <a className="mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-purple-900 bg-transparent p-0 text-2xl text-blue-gray-500 transition duration-150 ease-in-out hover:bg-purple-800 hover:text-white text-purple-800" aria-label="Previous"
                                onClick={() => {
                                    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
                                    scrollToTop();
                                }}>
                                <BiArrowBack />
                            </a>
                        </li>
                        {Array.from({ length: Math.ceil(orders.length / itemsPerPage) }).map((_, index) => (
                            <li key={index}>
                                <a className={`mx-1 flex h-9 w-9 items-center text-base font-semibold justify-center rounded-full ${currentPage === index + 1 ? 'bg-purple-800 text-white shadow-md' : 'border border-purple-900 bg-transparent text-purple-900 hover:bg-purple-300'} p-0 transition duration-150 ease-in-out`}
                                    onClick={() => {
                                        setCurrentPage(index + 1);
                                        scrollToTop();
                                    }}>
                                    {index + 1}
                                </a>
                            </li>
                        ))}
                        <li>
                            <a className="mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-purple-900 bg-transparent p-0 text-2xl text-blue-gray-500 transition duration-150 ease-in-out hover:bg-purple-800 hover:text-white text-purple-800" aria-label="Next"
                                onClick={() => {
                                    setCurrentPage((prevPage) =>
                                        Math.min(prevPage + 1, Math.ceil(orders.length / itemsPerPage))
                                    );
                                    scrollToTop();
                                }}>
                                <MdArrowForward />
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        )}
    </>;
};

export default Orders;