import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Order from "../models/Order";
import mongoose from "mongoose";
import Link from "next/link";
import Head from "next/head";
import { FaShippingFast, FaBoxOpen, FaTruck, FaCheck } from "react-icons/fa";

const MyOrder = ({ order, clearCart }) => {
  const products = order.products;
  const router = useRouter();
  const [date, setDate] = useState();

  useEffect(() => {
    const d = new Date(order.createdAt);
    setDate(d);

    if (router.query.clearCart == 1) {
      clearCart();
    }
  }, []);

  const deliveryStatuses = [
    "Order Placed & Unshipped",
    "Shipped",
    "Out for Delivery",
    "Delivered",
  ];

  return (
    <>
      <Head>
        <title>Otaku Store- Order- #{order.order_id}</title>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"
        />
      </Head>
      <section className="min-h-screen overflow-hidden">
        <div className="container px-5 py-20 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap justify-center items-center">
            <div className="lg:w-4/5 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              <div className="sideCart">
                <h2 className="font-bold text-purple-800 text-3xl">
                  Order ID - #{order.order_id}
                </h2>
                <h2 className="flex text-sm font-semibold title-font text-green-600 tracking-widest">
                  Your order has been placed successfully.
                </h2>
                <h2 className="flex text-sm font-semibold title-font tracking-widest">
                  Order Status:&nbsp;
                  <p className="text-green-600">{order.status}</p>
                </h2>
                <h2 className="flex text-sm font-semibold title-font tracking-widest">
                  Order placed on:&nbsp;{" "}
                  <p className="text-green-600">
                    {date &&
                      date.toLocaleDateString("en-IN", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                  </p>
                </h2>
                <div className="mt-6 mb-6 border-b-2 border-purple-500" />
                <div className="overflow-x-auto shadow-md sm:rounded-lg">
                  <table className="w-full text-lg text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-800 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="py-3 px-6">
                          <span className="sr-only">Image</span>
                        </th>
                        <th scope="col" className="py-3 px-6">
                          Product
                        </th>
                        <th scope="col" className="py-3 px-4">
                          Qty
                        </th>
                        <th scope="col" className="py-3 px-12">
                          Total Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.keys(products).map((Key) => {
                        return (
                          <tr
                            key={Key}
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                          >
                            <td className="p-4 w-32">
                              <img
                                src={products[Key].img}
                                alt={products[Key].name}
                              />
                            </td>
                            <td className="py-4 px-6 font-semibold text-purple-800 dark:text-white">
                              {products[Key].name}
                              <h1 className="flex text-gray-500 text-xs title-font font-medium mb-1">
                                Size:
                                <p className="text-purple-900 text-xs title-font font-medium mb-1 ml-1">
                                  {products[Key].size}
                                </p>
                              </h1>
                              {products[Key].variant !== "Standard" && (
                                <h1 className="flex text-gray-500 text-xs title-font font-medium mb-1">
                                  Color:
                                  <p className="text-purple-900 text-xs title-font font-medium mb-1 ml-1">
                                    {products[Key].variant}
                                  </p>
                                </h1>
                              )}
                            </td>
                            <td className="py-4 px-6">
                              <div className="grid grid-flow-row text-purple-800">
                                <div className="flex text-purple-800">
                                  {products[Key].qty}
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-16 font-semibold text-purple-800 dark:text-white">
                              ₹{products[Key].price * products[Key].qty}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="container mx-auto px-4 py-8">
                <div className="flex justify-center items-center space-x-4">
                  <ol className="flex items-center w-full">
                    {deliveryStatuses.map((status, index) => (
                      <li
                        key={status}
                        className={`flex w-full items-center ${
                          order.deliverystatus === status
                            ? "text-purple-600 dark:text-purple-500 after:content-[''] after:w-full after:h-1 after:border-b after:border-purple-500 after:border-4 after:inline-block dark:after:border-purple-800"
                            : "after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-4 after:inline-block dark:after:border-gray-700"
                        }`}
                      >
                        <span
                          className={`flex items-center justify-center w-10 h-10 ${
                            order.deliverystatus === status
                              ? "bg-purple-200 rounded-full lg:h-12 lg:w-12 dark:bg-purple-800"
                              : "bg-gray-200 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700"
                          } shrink-0`}
                        >
                          {index <
                          deliveryStatuses.indexOf(order.deliverystatus) ? (
                            <FaCheck className="w-3.5 h-3.5 text-purple-600 lg:w-4 lg:h-4 dark:text-purple-300" />
                          ) : (
                            <>
                              {index ===
                                deliveryStatuses.indexOf(
                                  order.deliverystatus
                                ) && (
                                <>
                                  {status === "Order Placed & Unshipped" && (
                                    <FaBoxOpen className="w-3.5 h-3.5 text-purple-600 lg:w-4 lg:h-4 dark:text-purple-300" />
                                  )}
                                  {status === "Shipped" && (
                                    <FaTruck className="w-3.5 h-3.5 text-purple-600 lg:w-4 lg:h-4 dark:text-purple-300" />
                                  )}
                                  {status === "Out for Delivery" && (
                                    <FaShippingFast className="w-3.5 h-3.5 text-purple-600 lg:w-4 lg:h-4 dark:text-purple-300" />
                                  )}
                                  {status === "Delivered" && (
                                    <FaCheck className="w-3.5 h-3.5 text-purple-600 lg:w-4 lg:h-4 dark:text-purple-300" />
                                  )}
                                </>
                              )}
                            </>
                          )}
                        </span>
                        <p
                          className={`ml-2 ${
                            order.deliverystatus === status
                              ? "text-purple-600 dark:text-purple-500 font-semibold"
                              : "text-gray-600 dark:text-gray-500"
                          }`}
                        >
                          {status}
                        </p>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
              <Link href={"/orders"} legacyBehavior>
                <button className="flex justify-end ml-auto mt-4 text-white font-semibold bg-purple-900 border-0 py-2 px-6 focus:outline-none hover:text-yellow-400 rounded">
                  My Orders
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONO_URI);
  }
  let order = await Order.findById(context.query.id);

  return {
    props: { order: JSON.parse(JSON.stringify(order)) },
  };
}

export default MyOrder;
