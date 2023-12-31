import React, { useEffect, useState } from "react";
import Link from "next/link";
import Product from "../models/Product";
import mongoose from "mongoose";
import Head from "next/head";
import { MdArrowForward } from "react-icons/md";
import { BiArrowBack } from "react-icons/bi";

const TShirts = ({ products }) => {
  const [sortBy, setSortBy] = useState("price");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const totalItems = products.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const shouldShowPagination = totalItems > itemsPerPage;

  const filteredProducts = Object.values(products).filter((product) => {
    if (selectedColor && !product.color.includes(selectedColor)) {
      return false;
    }
    if (selectedSize && !product.size.includes(selectedSize)) {
      return false;
    }
    return true;
  });

  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortBy === "price-low-to-high") {
      return a.price - b.price;
    } else if (sortBy === "price-high-to-low") {
      return b.price - a.price;
    }
    return 0;
  });

  useEffect(() => {
    if (sortBy === "") {
      window.location.reload();
    }
  }, [sortBy]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <Head>
        <title>Otaku Store- T-Shirts</title>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"
        />
      </Head>
      <section className="min-h-screen text-gray-700 body-font">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-baseline justify-between inline-block border-b border-gray-200 pb-4 pt-20">
            <h1 className="text-4xl font-bold tracking-tight text-purple-900">
              T-Shirts
            </h1>
            <div className="flex items-center">
              <div className="flex relative text-left">
                <div className="mr-2 font-semibold">
                  Sort by:
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="ml-1 px-0.5 py-0.5 border rounded-md focus:outline-none border-purple-950 focus:ring-purple-500 focus:border-purple-500 text-sm"
                  >
                    <option className="font-semibold" value="">
                      None
                    </option>
                    <option className="font-semibold" value="price-low-to-high">
                      Price: Low to High
                    </option>
                    <option className="font-semibold" value="price-high-to-low">
                      Price: High to Low
                    </option>
                  </select>
                </div>
                <div className="mr-2 font-semibold">
                  Color:
                  <select
                    value={selectedColor}
                    onChange={(e) => setSelectedColor(e.target.value)}
                    className="ml-1 px-0.5 py-0.5 border rounded-md focus:outline-none border-purple-950 focus:ring-purple-500 focus:border-purple-500 text-sm"
                  >
                    <option className="font-semibold" value="">
                      All
                    </option>
                    <option className="text-red-600 font-semibold" value="red">
                      Red
                    </option>
                    <option
                      className="text-blue-800 font-semibold"
                      value="blue"
                    >
                      Blue
                    </option>
                    <option
                      className="text-green-600 font-semibold"
                      value="green"
                    >
                      Green
                    </option>
                    <option
                      className="text-yellow-600 font-semibold"
                      value="yellow"
                    >
                      Yellow
                    </option>
                    <option
                      className="text-orange-600 font-semibold"
                      value="orange"
                    >
                      Orange
                    </option>
                    <option
                      className="text-pink-500 font-semibold"
                      value="pink"
                    >
                      Pink
                    </option>
                    <option
                      className="text-purple-600 font-semibold"
                      value="purple"
                    >
                      Purple
                    </option>
                    <option
                      className="text-yellow-950 font-semibold"
                      value="brown"
                    >
                      Brown
                    </option>
                    <option
                      className="text-gray-400 font-semibold"
                      value="white"
                    >
                      White
                    </option>
                    <option
                      className="text-gray-700 font-semibold"
                      value="gray"
                    >
                      Gray
                    </option>
                    <option className="text-black font-semibold" value="black">
                      Black
                    </option>
                  </select>
                </div>
                <div className="font-semibold">
                  Size:
                  <select
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                    className="ml-1 px-0.5 py-0.5 border rounded-md focus:outline-none border-purple-950 focus:ring-purple-500 focus:border-purple-500 text-sm"
                  >
                    <option className="font-semibold" value="">
                      All
                    </option>
                    <option className="font-semibold" value="S">
                      S
                    </option>
                    <option className="font-semibold" value="M">
                      M
                    </option>
                    <option className="font-semibold" value="L">
                      L
                    </option>
                    <option className="font-semibold" value="XL">
                      XL
                    </option>
                    <option className="font-semibold" value="XXL">
                      XXL
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="container px-16 py-10 mx-auto">
            <div className="flex flex-wrap -m-4 justify-center">
              {Object.keys(currentItems).length === 0 && (
                <p>Sorry! All items are currently out of stock.</p>
              )}
              {Object.keys(currentItems).map((item) => {
                return (
                  <Link
                    key={currentItems[item]._id}
                    passHref={true}
                    href={`/product/${currentItems[item].slug}`}
                    legacyBehavior
                  >
                    <div className="flex flex-col justify-between lg:w-1/5 md:w-1/2 p-4 w-full cursor-pointer hover:shadow-slate-300 shadow-lg m-3 hover:shadow-xl rounded-lg overflow-hidden">
                      <div className="block rounded overflow-hidden">
                        <img
                          alt="ecommerce"
                          className="object-cover object-center w-full h-60 block"
                          src={currentItems[item].img}
                        />
                      </div>
                      <div className="mt-4 text-center">
                        <h3 className="text-gray-800 text-xs font-medium tracking-widest title-font mb-1">
                          {currentItems[item].category}
                        </h3>
                        <h2 className="text-purple-900 title-font font-bold text-lg">
                          {currentItems[item].title}
                        </h2>
                        <div className="mt-1">
                          {currentItems[item].color.includes("red") && (
                            <button className="border-2 border-gray-300 ml-1 bg-red-500 rounded-full w-6 h-6 focus:outline-none"></button>
                          )}
                          {currentItems[item].color.includes("blue") && (
                            <button className="border-2 border-gray-300 ml-1 bg-blue-800 rounded-full w-6 h-6 focus:outline-none"></button>
                          )}
                          {currentItems[item].color.includes("green") && (
                            <button className="border-2 border-gray-300 ml-1 bg-green-500 rounded-full w-6 h-6 focus:outline-none"></button>
                          )}
                          {currentItems[item].color.includes("yellow") && (
                            <button className="border-2 border-gray-300 ml-1 bg-yellow-500 rounded-full w-6 h-6 focus:outline-none"></button>
                          )}
                          {currentItems[item].color.includes("orange") && (
                            <button className="border-2 border-gray-300 ml-1 bg-orange-500 rounded-full w-6 h-6 focus:outline-none"></button>
                          )}
                          {currentItems[item].color.includes("pink") && (
                            <button className="border-2 border-gray-300 ml-1 bg-pink-500 rounded-full w-6 h-6 focus:outline-none"></button>
                          )}
                          {currentItems[item].color.includes("purple") && (
                            <button className="border-2 border-gray-300 ml-1 bg-purple-700 rounded-full w-6 h-6 focus:outline-none"></button>
                          )}
                          {currentItems[item].color.includes("brown") && (
                            <button className="border-2 border-gray-300 ml-1 bg-yellow-950 rounded-full w-6 h-6 focus:outline-none"></button>
                          )}
                          {currentItems[item].color.includes("white") && (
                            <button className="border-2 border-gray-300 ml-1 bg-white rounded-full w-6 h-6 focus:outline-none"></button>
                          )}
                          {currentItems[item].color.includes("gray") && (
                            <button className="border-2 border-gray-300 ml-1 bg-gray-600 rounded-full w-6 h-6 focus:outline-none"></button>
                          )}
                          {currentItems[item].color.includes("black") && (
                            <button className="border-2 border-gray-300 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none"></button>
                          )}
                        </div>
                        <div className="mt-1">
                          {currentItems[item].size.includes("S") && (
                            <span className="border border-gray-500 px-1 mx-1">
                              S
                            </span>
                          )}
                          {currentItems[item].size.includes("M") && (
                            <span className="border border-gray-500 px-1 mx-1">
                              M
                            </span>
                          )}
                          {currentItems[item].size.includes("L") && (
                            <span className="border border-gray-500 px-1 mx-1">
                              L
                            </span>
                          )}
                          {currentItems[item].size.includes("XL") && (
                            <span className="border border-gray-500 px-1 mx-1">
                              XL
                            </span>
                          )}
                          {currentItems[item].size.includes("XXL") && (
                            <span className="border border-gray-500 px-1 mx-1">
                              XXL
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-purple-800 text-lg font-bold">
                          ₹{currentItems[item].price}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
        {shouldShowPagination && (
          <div className="flex justify-center my-4">
            <nav>
              <ul className="flex cursor-pointer">
                <li>
                  <a
                    className="mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-purple-900 bg-transparent p-0 text-2xl text-blue-gray-500 transition duration-150 ease-in-out hover:bg-purple-800 hover:text-white text-purple-800"
                    aria-label="Previous"
                    onClick={() =>
                      setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
                    }
                  >
                    <BiArrowBack />
                  </a>
                </li>
                {Array.from({
                  length: Math.ceil(sortedProducts.length / itemsPerPage),
                }).map((_, index) => (
                  <li key={index}>
                    <a
                      className={`mx-1 flex h-9 w-9 items-center text-base font-semibold justify-center rounded-full ${
                        currentPage === index + 1
                          ? "bg-purple-800 text-white shadow-md"
                          : "border border-purple-900 bg-transparent text-purple-900 hover:bg-purple-300"
                      } p-0 transition duration-150 ease-in-out`}
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    className="mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-purple-900 bg-transparent p-0 text-2xl text-blue-gray-500 transition duration-150 ease-in-out hover:bg-purple-800 hover:text-white text-purple-800"
                    aria-label="Next"
                    onClick={() =>
                      setCurrentPage((prevPage) =>
                        Math.min(
                          prevPage + 1,
                          Math.ceil(sortedProducts.length / itemsPerPage)
                        )
                      )
                    }
                  >
                    <MdArrowForward />
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </section>
    </>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONO_URI);
  }
  let products = await Product.find({ category: "T-Shirt" });

  let tshirts = {};
  for (let item of products) {
    if (item.title in tshirts) {
      if (
        !tshirts[item.title].color.includes(item.color) &&
        item.availableQty > 0
      ) {
        tshirts[item.title].color.push(item.color);
      }
      if (
        !tshirts[item.title].size.includes(item.size) &&
        item.availableQty > 0
      ) {
        tshirts[item.title].size.push(item.size);
      }
    } else {
      tshirts[item.title] = JSON.parse(JSON.stringify(item));
      if (item.availableQty > 0) {
        tshirts[item.title].color = [item.color];
        tshirts[item.title].size = [item.size];
      } else {
        tshirts[item.title].color = [];
        tshirts[item.title].size = [];
      }
    }
  }

  return {
    props: { products: JSON.parse(JSON.stringify(tshirts)) },
  };
}

export default TShirts;
