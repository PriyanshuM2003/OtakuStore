import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import Product from "../models/Product"
import Head from 'next/head';
import mongoose from "mongoose";
import { MdArrowForward } from 'react-icons/md';
import { BiArrowBack } from 'react-icons/bi';

const Replicas = ({ products }) => {

  const [sortBy, setSortBy] = useState('price');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const totalItems = products.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const shouldShowPagination = totalItems > itemsPerPage;

  const sortedProducts = products.sort((a, b) => {
    if (sortBy === 'price-low-to-high') {
      return a.price - b.price;
    } else if (sortBy === 'price-high-to-low') {
      return b.price - a.price;
    }
    return 0;
  });

  useEffect(() => {
    if (sortBy === '') {
      window.location.reload();
    }
  }, [sortBy]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);

  return <>
    <Head>
      <title>Otaku Store- Replicas</title>
      <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
    </Head>
    <section className='min-h-screen text-gray-700 body-font'>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-baseline justify-between inline-block border-b border-gray-200 pb-4 pt-20">
          <h1 className="text-4xl font-bold tracking-tight text-purple-900">Replicas</h1>
          <div className="flex items-center">
            <div className="flex relative text-left">
              <div className='font-semibold'>
                Sort by:
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="ml-1 px-0.5 py-0.5 border rounded-md focus:outline-none border-purple-950 focus:ring-purple-500 focus:border-purple-500 text-sm">
                  <option className='font-semibold' value="">None</option>
                  <option className='font-semibold' value="price-low-to-high">Price: Low to High</option>
                  <option className='font-semibold' value="price-high-to-low">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="container px-16 py-10 mx-auto">
          <div className="flex flex-wrap -m-4 justify-center">
            {Object.keys(currentItems).length === 0 && <p>Sorry! All items are currently out of stock.</p>}
            {Object.keys(currentItems).map((item) => {
              return (
                <Link
                  key={currentItems[item]._id}
                  passHref={true}
                  href={`/product/${currentItems[item].slug}`}
                  legacyBehavior>
                  <div className="lg:w-1/5 md:w-1/2 p-4 w-full cursor-pointer hover:shadow-slate-300 shadow-lg m-3 hover:shadow-xl rounded-lg overflow-hidden">
                    <div className="block rounded overflow-hidden">
                      <img alt="ecommerce" className="object-cover object-center w-full h-60 block" src={currentItems[item].img} />
                    </div>
                    <div className="mt-4 text-center">
                      <h3 className="text-gray-800 text-xs tracking-widest title-font mb-1">{currentItems[item].category}</h3>
                      <h2 className="text-purple-900 title-font font-bold text-lg">{currentItems[item].title}</h2>
                      <p className="mt-1 text-purple-800 text-lg font-bold">₹{currentItems[item].price}</p>
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
                <a className="mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-purple-900 bg-transparent p-0 text-2xl text-blue-gray-500 transition duration-150 ease-in-out hover:bg-purple-800 hover:text-white text-purple-800" aria-label="Previous"
                  onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}>
                  <BiArrowBack />
                </a>
              </li>
              {Array.from({ length: Math.ceil(sortedProducts.length / itemsPerPage) }).map(
                (_, index) => (
                  <li key={index}>
                    <a className={`mx-1 flex h-9 w-9 items-center text-base font-semibold justify-center rounded-full ${currentPage === index + 1 ? 'bg-purple-800 text-white shadow-md' : 'border border-purple-900 bg-transparent text-purple-900 hover:bg-purple-300'} p-0 transition duration-150 ease-in-out`}
                      onClick={() => setCurrentPage(index + 1)}>
                      {index + 1}
                    </a>
                  </li>
                ))}
              <li>
                <a className="mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-purple-900 bg-transparent p-0 text-2xl text-blue-gray-500 transition duration-150 ease-in-out hover:bg-purple-800 hover:text-white text-purple-800" aria-label="Next"
                  onClick={() =>
                    setCurrentPage((prevPage) =>
                      Math.min(prevPage + 1, Math.ceil(sortedProducts.length / itemsPerPage))
                    )}>
                  <MdArrowForward />
                </a>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </section>
  </>;
}

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONO_URI)
  }
  let products = await Product.find({ category: 'Replica' })

  return {
    props: { products: JSON.parse(JSON.stringify(products)) },
  }
}

export default Replicas