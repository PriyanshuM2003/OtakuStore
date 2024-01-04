import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  AiOutlineShoppingCart,
  AiOutlineClose,
  AiFillPlusCircle,
  AiFillMinusCircle,
  AiOutlineClear,
} from "react-icons/ai";
import { MdAccountCircle, MdSearch } from "react-icons/md";
import { BsFillBagCheckFill, BsFillCartCheckFill } from "react-icons/bs";
import { BiLogIn } from "react-icons/bi";
import styles from "../styles/Navbar.module.css";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { RiAdminFill } from "react-icons/ri";

const Navbar = ({
  user,
  admin,
  logout,
  adminLogout,
  cart,
  addToCart,
  removeFromCart,
  clearCart,
  subTotal,
}) => {
  const [dropdown, setDropdown] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const [showSearchForm, setShowSearchForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const ref = useRef();
  const router = useRouter();

  const toggleCart = () => {
    setSidebar(!sidebar);
  };

  useEffect(() => {
    Object.keys(cart).length == 0 && setSidebar(false);
    let exempted = ["/mycart", "/order", "/orders"];
    if (exempted.includes(router.pathname)) {
      setSidebar(false);
    }
  }, []);

  const toggleSearchForm = () => {
    setShowSearchForm(!showSearchForm);
  };

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    router.push(`/search?query=${searchQuery}`);
  };

  return (
    <>
      <header className={styles.headContainer}>
        <div className={styles.navbar}>
          <div className="mx-auto flex flex-wrap p-2 flex-col md:flex-row">
            <Link
              href={"/"}
              className="flex title-font font-medium items-center text-xl mb-4 md:mb-0"
            >
              <h1 className="px-2 text-2xl text-gray-200 font-bold hover:text-yellow-400">
                OtakuStore
              </h1>
            </Link>
            <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center justify-center text-base font-semibold">
              <Link
                href={"/tshirts"}
                className="mr-5 md:mr-10 hover:text-yellow-400"
              >
                T-Shirts
              </Link>
              <Link
                href={"/actionfigs"}
                className="mr-5 md:mr-10 hover:text-yellow-400"
              >
                ActionFigs.
              </Link>
              <Link
                href={"/costumes"}
                className="mr-5 md:mr-10 hover:text-yellow-400"
              >
                Costumes
              </Link>
              <Link
                href={"/replicas"}
                className="mr-5 md:mr-10 hover:text-yellow-400"
              >
                Replicas
              </Link>
              <Link
                href={"/pillows"}
                className="mr-5 md:mr-10 hover:text-yellow-400"
              >
                Pillows
              </Link>
              <Link
                href={"/bedsheets"}
                className="mr-5 md:mr-10 hover:text-yellow-400"
              >
                Bedsheets
              </Link>
              <Link
                href={"/stickers"}
                className="mr-5 md:mr-10 hover:text-yellow-400"
              >
                Stickers
              </Link>
              <Link
                href={"/posters"}
                className="mr-5 md:mr-20 hover:text-yellow-400"
              >
                Posters
              </Link>
            </nav>
            <MdSearch
              className="text-4xl cursor-pointer hover:text-yellow-400 right-36 absolute"
              onClick={toggleSearchForm}
            />
            {user.value && (
              <button
                onMouseOver={() => {
                  setDropdown(true);
                }}
                onMouseLeave={() => {
                  setDropdown(false);
                }}
                className="Cart absolute right-16 top-2 mx-6 hover:text-yellow-400"
              >
                <MdAccountCircle className="text-3xl" />
              </button>
            )}
            {user.value && dropdown && (
              <div
                onMouseOver={() => {
                  setDropdown(true);
                }}
                onMouseLeave={() => {
                  setDropdown(false);
                }}
                className="absolute right-20 top-9 mx-2 z-10 w-44 bg-purple-900 rounded"
              >
                <ul
                  className="py-1 text-sm text-white font-semibold dark:text-gray-200 cursor-pointer"
                  aria-labelledby="dropdownDefault"
                >
                  <Link
                    href={"/myaccount"}
                    className="block py-2 px-4 hover:bg-purple-800 hover:text-yellow-400"
                  >
                    My Account
                  </Link>
                  <Link
                    href={"/orders"}
                    className="block py-2 px-4 hover:bg-purple-800 hover:text-yellow-400"
                  >
                    My Orders
                  </Link>
                  <li>
                    <a
                      onClick={logout}
                      className="block py-2 px-4 hover:bg-purple-800 hover:text-yellow-400"
                    >
                      Log out
                    </a>
                  </li>
                </ul>
              </div>
            )}
            {!admin.value && !user.value && (
              <button
                onMouseOver={() => {
                  setDropdown(true);
                }}
                onMouseLeave={() => {
                  setDropdown(false);
                }}
                className="Cart absolute right-16 mx-6 top-2 text-white font-semibold border-0 focus:outline-none rounded text-3xl hover:text-yellow-400"
              >
                <BiLogIn />
              </button>
            )}
            {!admin.value && !user.value && dropdown && (
              <div
                onMouseOver={() => {
                  setDropdown(true);
                }}
                onMouseLeave={() => {
                  setDropdown(false);
                }}
                className="absolute right-20 top-9 mx-2 z-10 w-44 bg-purple-900 rounded"
              >
                <ul
                  className="py-1 text-sm text-white font-semibold dark:text-gray-200 cursor-pointer"
                  aria-labelledby="dropdownDefault"
                >
                  <Link
                    href={"/login"}
                    className="block py-2 px-4 hover:bg-purple-800 hover:text-yellow-400"
                  >
                    As User
                  </Link>
                  <Link
                    href={"/admin/adminlogin"}
                    className="block py-2 px-4 hover:bg-purple-800 hover:text-yellow-400"
                  >
                    As Admin
                  </Link>
                </ul>
              </div>
            )}

            {admin.value && !user.value && (
              <Link href={"/admin"} legacyBehavior>
                <button
                  onMouseOver={() => {
                    setDropdown(true);
                  }}
                  onMouseLeave={() => {
                    setDropdown(false);
                  }}
                  className="Cart absolute right-16 mx-6 top-2 text-white font-semibold border-0 focus:outline-none rounded text-3xl hover:text-yellow-400"
                >
                  <RiAdminFill />
                </button>
              </Link>
            )}

            {admin.value && !user.value && dropdown && (
              <div
                onMouseOver={() => {
                  setDropdown(true);
                }}
                onMouseLeave={() => {
                  setDropdown(false);
                }}
                className="absolute right-20 top-9 mx-2 z-10 w-44 bg-purple-900 rounded"
              >
                <ul
                  className="py-1 text-sm text-white font-semibold dark:text-gray-200 cursor-pointer"
                  aria-labelledby="dropdownDefault"
                >
                  <Link
                    href={"/admin"}
                    className="block py-2 px-4 hover:bg-purple-800 hover:text-yellow-400"
                  >
                    Admin Panel
                  </Link>
                  <li>
                    <a
                      onClick={adminLogout}
                      className="block py-2 px-4 hover:bg-purple-800 hover:text-yellow-400"
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            )}

            {Object.keys(cart).length == 0 ? (
              <button
                onClick={toggleCart}
                className="Cart absolute right-0 top-2 mx-6 text-white hover:text-yellow-400"
              >
                <AiOutlineShoppingCart className="text-3xl" />
              </button>
            ) : (
              <button
                onClick={toggleCart}
                className="Cart absolute right-0 top-2 mx-6 text-white hover:text-yellow-400"
              >
                <BsFillCartCheckFill className="text-3xl" />
              </button>
            )}

            <div
              ref={ref}
              className={`sideCart z-20 overflow-y-auto no-scrollbar absolute top-0 right-0 p-12 w-84 h-screen bg-purple-900 transform transition-transform ${
                sidebar ? "translate-x-0" : "hidden"
              } `}
            >
              <h2 className="font-bold absolute text-yellow-400 text-2xl -ml-8 top-4">
                Shopping Cart
              </h2>
              <hr className="mt-6 mb-6" />
              <div
                onClick={toggleCart}
                className="absolute top-4 right-4 cursor-pointer text-3xl font-bold hover:text-yellow-400"
              >
                <AiOutlineClose />
              </div>
              <ol className="list-decimal -ml-5 font-semibold">
                {Object.keys(cart).length == 0 && (
                  <div className="flex text-2xl mt-20 justify-center items-center">
                    Your Cart is empty!
                  </div>
                )}
                {Object.keys(cart).map((k) => {
                  return (
                    <li key={k}>
                      <div className="item flex text-lg">
                        <div className="w-2/3 text-yellow-400">
                          {cart[k].name}
                          <h1 className="flex text-gray-200 text-sm title-font font-medium mb-1">
                            Size:
                            <p className="text-yellow-400 text-sm title-font font-medium ml-1">
                              {cart[k].size}
                            </p>
                          </h1>
                          {cart[k].variant !== "Standard" && (
                            <h1 className="flex text-gray-200 text-sm title-font font-medium mb-1">
                              Color:
                              <p className="text-yellow-400 text-sm title-font font-medium ml-1">
                                {cart[k].variant}
                              </p>
                            </h1>
                          )}
                        </div>
                        <div className="w-1/3 flex justify-center items-center text-yellow-400">
                          <button
                            onClick={() => {
                              removeFromCart(
                                k,
                                1,
                                cart[k].price,
                                cart[k].name,
                                cart[k].size,
                                cart[k].variant,
                                cart[k].img
                              );
                            }}
                            className="mx-1"
                          >
                            <AiFillMinusCircle />
                          </button>
                          {cart[k].qty}
                          <button
                            onClick={() => {
                              addToCart(
                                k,
                                1,
                                cart[k].price,
                                cart[k].name,
                                cart[k].size,
                                cart[k].variant,
                                cart[k].img
                              );
                            }}
                            className="mx-1"
                          >
                            <AiFillPlusCircle />
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ol>
              {Object.keys(cart).length > 0 && (
                <div className="flex title-font font-medium mt-12 text-2xl justify-end text-yellow-400">
                  Total: ₹{subTotal}
                </div>
              )}
              <div className="flex mx-auto mt-16 items-center justify-center">
                {Object.keys(cart).length > 0 && (
                  <Link href={"/mycart"} legacyBehavior>
                    <button className="flex mx-2 w-auto items-center justify-center text-purple-900 font-bold bg-gray-100 border-0 py-2 px-4 focus:outline-none disabled:bg-slate-400 hover:bg-yellow-400 rounded">
                      <BsFillBagCheckFill className="text-2xl mr-1" />
                      My Cart
                    </button>
                  </Link>
                )}
                {Object.keys(cart).length > 0 && (
                  <button
                    onClick={clearCart}
                    className="flex mx-2 w-auto items-center justify-center text-purple-900 font-bold bg-gray-100 border-0 py-2 px-4 focus:outline-none hover:bg-yellow-400 rounded"
                  >
                    <AiOutlineClear className="text-2xl mr-1" />
                    Clear
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {showSearchForm && (
          <form className="flex justify-center" onSubmit={handleSearchSubmit}>
            <div className="absolute md:w-1/3 w-5/6 mx-auto mt-2">
              <input
                type="search"
                id="search-dropdown"
                value={searchQuery}
                onChange={handleSearchQueryChange}
                className="block p-2.5 w-full z-20 text-sm text-purple-900 bg-purple-100 border-l-purple-50 border-l-2 border rounded-full border-purple-300 focus:ring-purple-500 focus:border-purple-500 dark:bg-purple-700 dark:border-l-purple-700  dark:border-purple-600 dark:placeholder-purple-400 dark:text-white dark:focus:border-purple-500"
                placeholder="Search Products..."
                required
              />
              <button
                type="submit"
                className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white hover:text-yellow-400 bg-purple-700 border border-purple-700 rounded-full hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </button>
            </div>
          </form>
        )}
      </header>
    </>
  );
};

export default Navbar;
