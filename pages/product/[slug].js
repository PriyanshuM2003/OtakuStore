import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Error from "next/error";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Product from "../../models/Product";
import mongoose from "mongoose";
import Head from "next/head";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Post = ({ buyNow, addToCart, product, variants, error }) => {
  const router = useRouter();
  const { slug } = router.query;
  const [pinCode, setPinCode] = useState();
  const [service, setService] = useState();

  const [selectedColor, setSelectedColor] = useState(() => {
    const firstColor = Object.keys(variants)[0];
    return firstColor || null;
  });

  const [selectedSize, setSelectedSize] = useState(() => {
    const firstColor = Object.keys(variants)[0];
    if (firstColor) {
      const firstSize = Object.keys(variants[firstColor])[0];
      return firstSize || null;
    }
    return null;
  });

  useEffect(() => {
    if (!error) {
      setSelectedColor(product.color);
      setSelectedSize(product.size);
    }
  }, [router.query]);

  useEffect(() => {
    refreshVariant(selectedColor, selectedSize);
  }, [selectedColor]);

  const checkServiceAvail = async () => {
    let pinCodes = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
    let pinCodeJson = await pinCodes.json();
    if (Object.keys(pinCodeJson).includes(pinCode)) {
      setService(true);
    } else {
      setService(false);
    }
  };

  const onChangePincode = (e) => {
    setPinCode(e.target.value);
  };

  const refreshVariant = (newColor, newSize) => {
    setSelectedSize(newSize);
    setSelectedColor(newColor);
    const firstAvailableSize = Object.keys(variants[newColor])[0];
    setSelectedSize(firstAvailableSize);

    if (variants && variants[newColor] && variants[newColor][newSize]) {
      const slug = variants[newColor][newSize]["slug"];
      let url = `${process.env.NEXT_PUBLIC_HOST}/product/${slug}`;
      router.push(url);
    }
  };

  const notify = () =>
    toast.success("Item added to cart!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });

  if (error == 404) {
    return <Error statusCode={404} />;
  }

  return (
    <>
      <Head>
        <title>{`Otaku Store - ${product.title}`}</title>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"
        />
      </Head>
      <section className="min-h-screen text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-20 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap justify-center items-center">
            <img
              alt="ecommerce"
              className="lg:w-96 w-full h-auto object-cover object-top rounded"
              src={product.img}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm font-medium title-font text-gray-700 tracking-widest">
                Otaku Store {product.category}
              </h2>
              <h1 className="text-purple-900 text-3xl title-font font-medium mb-1">
                {product.title}
              </h1>
              <h1 className="flex text-gray-500 text-base title-font font-medium">
                Size:
                <p className="text-purple-900 text-base title-font font-medium mx-1">
                  {product.size}
                </p>
              </h1>
              {product.color !== "Standard" && (
                <h1 className="flex text-gray-500 text-base title-font font-medium mb-1">
                  Color:
                  <p className="text-purple-900 text-base title-font font-medium mb-1 mx-1">
                    {product.color}
                  </p>
                </h1>
              )}
              <h1 className="leading-relaxed text-gray-900 font-medium mt-1">
                {product.desc}
              </h1>
              {/* <h1 className="text-purple-900 text-xl title-font font-medium mb-1">Color:{product.color}</h1> */}
              {/* <div className="flex mb-4">
              <span className="flex items-center">
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-yellow-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-yellow-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-yellow-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-yellow-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-yellow-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <span className="text-gray-600 ml-3">4 Reviews</span>
              </span>
              <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                <a className="text-gray-500">
                  <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                  </svg>
                </a>
                <a className="text-gray-500">
                  <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                  </svg>
                </a>
                <a className="text-gray-500">
                  <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                  </svg>
                </a>
              </span>
            </div> */}
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                {product.color !== "Standard" && (
                  <div className="flex">
                    <span className="mr-3">Color:</span>
                    {Object.keys(variants).map((colorOption) => (
                      <button
                        key={colorOption}
                        onClick={() => {
                          refreshVariant(colorOption, selectedSize);
                        }}
                        className={`border-2 ${
                          selectedColor === colorOption
                            ? "border-black"
                            : "border-gray-400"
                        } ml-1 rounded-full w-6 h-6 focus:outline-none`}
                        style={{ backgroundColor: colorOption }}
                      ></button>
                    ))}
                  </div>
                )}
                <div
                  className={
                    product.category === "T-Shirt"
                      ? "flex ml-6 items-center"
                      : "flex my-4 items-center"
                  }
                >
                  <div className="absolute z-0">
                    <span className="mr-3">Size:</span>
                    <select
                      value={selectedSize}
                      onChange={(e) => {
                        refreshVariant(selectedColor, e.target.value);
                      }}
                      className="rounded border appearance-none border-purple-900 py-2 focus:outline-none font-semibold focus:ring-2 focus:ring-indigo-500 overflow-hidden focus:border-purple-500 text-base pl-3 pr-10"
                    >
                      {selectedColor &&
                        Object.keys(variants[selectedColor]).map(
                          (sizeOption) => (
                            <option key={sizeOption} value={sizeOption}>
                              {sizeOption}
                            </option>
                          )
                        )}
                    </select>
                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex">
                {product.availableQty <= 0 && (
                  <span className="title-font font-semibold text-3xl text-purple-800">
                    Out of stock!
                  </span>
                )}
                {product.availableQty > 0 && (
                  <span className="title-font font-medium text-4xl text-purple-800">
                    ₹{product.price}
                  </span>
                )}
                {product.availableQty > 0 && (
                  <button
                    onClick={() => {
                      buyNow(
                        slug,
                        1,
                        product.price,
                        product.title,
                        selectedSize,
                        selectedColor,
                        product.img
                      );
                    }}
                    className="flex ml-4 text-white text-lg font-semibold bg-purple-800 border-0 py-2 px-6 focus:outline-none hover:text-yellow-400 rounded"
                  >
                    Buy Now
                  </button>
                )}
                {product.availableQty > 0 && (
                  <button
                    onClick={() => {
                      addToCart(
                        slug,
                        1,
                        product.price,
                        product.title,
                        selectedSize,
                        selectedColor,
                        product.img
                      );
                    }}
                    className="rounded-full w-11 h-11 bg-purple-800 p-0 border-0 inline-flex items-center justify-center text-gray-100 ml-4"
                  >
                    <AiOutlineShoppingCart
                      onClick={notify}
                      className="text-3xl hover:text-yellow-400"
                    />
                  </button>
                )}
                <ToastContainer
                  position="top-right"
                  autoClose={1000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                />
                {/* <button className="rounded-full w-11 h-11 bg-purple-800 p-0 border-0 inline-flex items-center justify-center text-gray-100 ml-4 hover:text-yellow-400">
                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                </svg>
              </button> */}
              </div>
              {product.availableQty > 0 && (
                <div className="flex mt-8 md:mt-3 md:flex-nowrap flex-wrap justify-center items-center md:items-end md:justify-end">
                  <div className="flex sm:w-32 w-40 sm:mr-4 mr-2">
                    <input
                      onChange={onChangePincode}
                      type="text"
                      id="Pincode"
                      placeholder="Pincode"
                      name="Pincode"
                      className="w-full rounded border border-purple-900 focus:ring-2 focus:ring-purple-400 focus:border-purple-900 text-base outline-none text-gray-700 py-1 px-3 leading-8"
                    />
                  </div>
                  <button
                    onClick={checkServiceAvail}
                    className="inline-flex text-white bg-purple-800 border-0 py-2 px-6 hover:text-yellow-400 font-semibold focus:outline-none rounded"
                  >
                    Check
                  </button>
                </div>
              )}
              {product.availableQty > 0 && !service && service != null && (
                <div className="flex justify-center items-center md:justify-end md:items-end text-red-600 text-sm mt-3">
                  Sorry! Delivery service is not available to this pincode
                </div>
              )}
              {product.availableQty > 0 && service && service != null && (
                <div className="flex justify-center items-center md:justify-end md:items-end text-green-600 text-sm mt-3">
                  Delivery service is available to this pincode
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export async function getServerSideProps(context) {
  let error = null;
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONO_URI);
  }

  let product = await Product.findOne({ slug: context.query.slug });
  if (product == null) {
    return {
      props: { error: error },
    };
  }
  let variants = await Product.find({
    title: product.title,
    category: product.category,
  });
  let colorSizeSlug = {};
  for (let item of variants) {
    if (Object.keys(colorSizeSlug).includes(item.color)) {
      colorSizeSlug[item.color][item.size] = { slug: item.slug };
    } else {
      colorSizeSlug[item.color] = {};
      colorSizeSlug[item.color][item.size] = { slug: item.slug };
    }
  }

  return {
    props: {
      error: error,
      product: JSON.parse(JSON.stringify(product)),
      variants: JSON.parse(JSON.stringify(colorSizeSlug)),
    },
  };
}

export default Post;
