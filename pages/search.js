import React from "react";
import Link from "next/link";
import Product from "../models/Product";
import mongoose from "mongoose";
import Head from "next/head";

const SearchPage = ({ products, tags }) => {
  return (
    <>
      <section className="min-h-screen text-gray-700 body-font">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-baseline justify-center inline-block border-b border-gray-200 pb-4 pt-12">
            <h1 className="text-2xl text-center">
              Search results for:&nbsp;
              <span className="text-purple-600 font-semibold">
                {tags.map((tag, index) => (
                  <React.Fragment key={index}>
                    {index > 0 && ", "}
                    {`"${tag}"`}
                  </React.Fragment>
                ))}
              </span>
            </h1>
          </div>
          <div className="container px-16 py-8 mx-auto">
            <div className="flex flex-wrap justify-center">
              {Object.keys(products).length === 0 && (
                <p>Sorry! Search result not found.</p>
              )}
              {Object.keys(products).map((item) => {
                return (
                  <div key={products[item]._id}>
                    <Head>
                      <title>{`OtakuStore- Search=${products[item].tags}`}</title>
                      <meta
                        name="viewport"
                        content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"
                      />
                    </Head>
                    <Link
                      passHref={true}
                      href={`/product/${products[item].slug}`}
                      legacyBehavior
                    >
                      <div className="flex flex-col justify-between lg:w-56 md:w-1/2 p-4 w-full h-96 cursor-pointer hover:shadow-slate-300 shadow-lg m-3 hover:shadow-xl rounded-lg overflow-hidden">
                        <div className="block rounded overflow-hidden">
                          <img
                            alt="ecommerce"
                            className="object-cover object-center w-full h-60 block"
                            src={products[item].img}
                          />
                        </div>
                        <div className="mt-4 text-center">
                          <h3 className="text-gray-800 text-xs tracking-widest title-font mb-1">
                            {products[item].category}
                          </h3>
                          <h2 className="text-purple-900 title-font font-bold text-lg">
                            {products[item].title}
                          </h2>
                          <p className="mt-1 text-purple-800 text-lg font-bold">
                            ₹{products[item].price}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SearchPage;

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONO_URI);
  }

  const { query } = context.query;
  const tags = query.split(",");

  let products = [];
  if (tags.length > 0) {
    products = await Product.find({ tags: { $all: tags } });
  }

  const uniqueProducts = [];
  const imageSet = new Set();
  products.forEach((product) => {
    if (!imageSet.has(product.img)) {
      uniqueProducts.push(product);
      imageSet.add(product.img);
    }
  });

  return {
    props: {
      products: JSON.parse(JSON.stringify(uniqueProducts)),
      tags: tags,
    },
  };
}
