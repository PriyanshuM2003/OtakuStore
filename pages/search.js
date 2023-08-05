import React from 'react';
import Link from 'next/link'
import Product from "../models/Product"
import mongoose from "mongoose";
import Head from 'next/head';

const SearchPage = ({ products,tags }) => {

    return (
        <>
            <section className='min-h-screen text-gray-700 body-font'>
                <div className="bg-white mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="container px-16 py-14 mx-auto">
                        <div className="flex flex-wrap -m-4 justify-center">
                            {Object.keys(products).length === 0 && <p>Sorry! All items are currently out of stock.</p>}
                            {Object.keys(products).map((item) => {
                                return <Link key={products[item]._id} passHref={true} href={`/product/${products[item].slug}`}>
                                    <div>
                                        <Head>
                                            <title>{`OtakuStore- Search=${products[item].tags}`}</title>
                                            <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
                                        </Head>
                                        <h1 className="text-2xl text-center py-4 md:flex md:items-baseline justify-between inline-block border-b border-gray-200 pb-4">Search results for:&nbsp;
                                            <span className="text-purple-600 font-semibold">
                                                {tags.map((tag, index) => (
                                                    <React.Fragment key={index}>
                                                        {index > 0 && ', '}
                                                        {`"${tag}"`}
                                                    </React.Fragment>
                                                ))}
                                            </span>
                                        </h1>
                                        <div className="lg:w-52 md:w-1/2 p-4
                                        flex flex-row flex-wrap justify-center py-2 w-full cursor-pointer shadow-lg m-auto mt-6 hover:shadow-xl rounded-lg overflow-hidden">
                                            <a className="block rounded overflow-hidden">
                                                <img alt="ecommerce" className="object-cover object-center w-full h-auto block" src={products[item].img} />
                                            </a>
                                            <div className="mt-4 text-center">
                                                <h3 className="text-gray-800 text-xs tracking-widest title-font mb-1">{products[item].category}</h3>
                                                <h2 className="text-purple-900 title-font font-bold text-lg">{products[item].title}</h2>
                                                <p className="mt-1 text-purple-800 text-lg font-bold">₹{products[item].price}</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            })}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export async function getServerSideProps(context) {

    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONO_URI);
    }

    const { query } = context.query;
    const tags = query.split(',');

    let products = [];
    if (tags.length > 0) {
        products = await Product.find({ tags: { $all: tags } });
    }

    return {
        props: {
            products: JSON.parse(JSON.stringify(products)),
            tags: tags,
        },
    };
}

export default SearchPage