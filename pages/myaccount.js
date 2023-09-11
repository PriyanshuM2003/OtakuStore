import React, { useEffect, useState } from "react";
import Router from "next/router";
import { ToastContainer, toast } from "react-toastify";
import Head from "next/head";
import "react-toastify/dist/ReactToastify.css";

const MyAccount = () => {
  const router = Router;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pincode, setPincode] = useState("");
  const [password, setPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [confpassword, setConfPassword] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [user, setUser] = useState({ value: null });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("myuser"));
    if (!user) {
      router.push("/");
    }
    if (user && user.token) {
      setUser(user);
      setEmail(user.email);
      setName(user.name);
      setPhone(user.phone);
      setAddress(user.address);
      setPincode(user.pincode);
      setState(user.state);
      setCity(user.city);
      fetchData(user.token);
    }
  }, []);

  const fetchData = async (token) => {
    let data = { token: token };
    let gUser = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let res = await gUser.json();
    console.log(res);
    setName(res.name);
    setPhone(res.phone);
    setPincode(res.pincode);
    setAddress(res.address);
    setState(res.state);
    setCity(res.city);
  };

  const handleUserSave = async () => {
    let data = {
      token: user.token,
      name,
      address,
      phone,
      pincode,
      state,
      city,
    };
    let gUser = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let res = await gUser.json();
    if (res.success) {
      toast.success("Personal Details Updated Successfully", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error("Invalid Credentials", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handlePasswordChange = async () => {
    let res;
    if (newpassword == confpassword) {
      let data = { token: user.token, password, newpassword, confpassword };
      let gUser = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/updatepassword`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      res = await gUser.json();
    } else {
      res = { success: false };
    }
    if (res.success) {
      localStorage.removeItem("myuser");
      router.push("/login");
      toast.success("Password Updated Successfully", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error("Invalid Credentials", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    setPassword("");
    setConfPassword("");
    setNewPassword("");
  };

  const handleChange = async (e) => {
    if (e.target.name == "name") {
      setName(e.target.value);
    } else if (e.target.name == "phone") {
      setPhone(e.target.value);
    } else if (e.target.name == "password") {
      setPassword(e.target.value);
    } else if (e.target.name == "confpassword") {
      setConfPassword(e.target.value);
    } else if (e.target.name == "newpassword") {
      setNewPassword(e.target.value);
    } else if (e.target.name == "address") {
      setAddress(e.target.value);
    } else if (e.target.name == "pincode") {
      setPincode(e.target.value);
      if (e.target.value.length == 6) {
        let pinCodes = await fetch(
          `${process.env.NEXT_PUBLIC_HOST}/api/pincode`
        );
        let pinCodeJson = await pinCodes.json();
        if (Object.keys(pinCodeJson).includes(e.target.value)) {
          setState(pinCodeJson[e.target.value][1]);
          setCity(pinCodeJson[e.target.value][0]);
        } else {
          setState("");
          setCity("");
        }
      } else {
        setState("");
        setCity("");
      }
    }
  };

  return (
    <>
      <Head>
        <title>Otaku Store- MyAccount</title>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"
        />
      </Head>
      <div className="min-h-screen mx-auto p-16">
        <h2 className="font-bold text-purple-800 text-3xl">My Account</h2>
        <div className="mt-4 mb-4 border-b-2 border-purple-500" />
        <form className="w-full">
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

          <div className="my-4">
            <u className="font-bold text-purple-800 text-xl">
              Personal Details
            </u>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block appearance-none uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="name"
              >
                Full Name
              </label>
              <input
                onChange={handleChange}
                value={name}
                name="name"
                className="w-full font-semibold bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="name"
                type="text"
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                htmlFor="email"
                className="block appearance-none uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              >
                Your email
              </label>
              <input
                value={user.email}
                type="email"
                name="email"
                id="email"
                aria-describedby="helper-text-explanation"
                className="w-full font-semibold bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                readOnly
              />
              <span id="email" className="text-xs font-semibold text-red-500">
                You cannot change your email.
              </span>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block appearance-none uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="address"
              >
                Address
              </label>
              <input
                onChange={handleChange}
                value={address}
                name="address"
                className="w-full font-semibold bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="address"
                type="text"
              />
            </div>
          </div>
          <div className="flex flex-wrap mb-2">
            <div className="w-full md:w-1/3 mb-6">
              <label
                className="block appearance-none uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="phone"
              >
                Phone Number
              </label>
              <input
                onChange={handleChange}
                maxLength="10"
                pattern="\d{10}"
                value={phone}
                name="phone"
                className="w-full font-semibold bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="phone"
                type="text"
                placeholder="Please enter your 10 digit mobile no."
              />
            </div>
            <div className="w-full md:w-1/3 md:ml-8 mb-6 md:mb-0">
              <label
                className="block appearance-none uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="pincode"
              >
                Pincode
              </label>
              <input
                onChange={handleChange}
                maxLength="6"
                pattern="\d{10}"
                value={pincode}
                name="pincode"
                className="w-full font-semibold bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="pincode"
                type="text"
                placeholder="Please enter 6 digit valid PinCode to fillout City & State"
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                className="block appearance-none uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="city"
              >
                City
              </label>
              <input
                value={city}
                onChange={handleChange}
                type="text"
                name="city"
                id="city"
                className="w-full font-semibold bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                readOnly
              />
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                className="block appearance-none uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="state"
              >
                State
              </label>
              <input
                value={state}
                onChange={handleChange}
                type="text"
                name="state"
                id="state"
                className="w-full font-semibold bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                readOnly
              />
            </div>
          </div>
          <p
            id="email"
            className="mt-2 text-sm text-gray-500 dark:text-gray-400"
          >
            We’ll never share your details. Read our{" "}
            <a
              href="#"
              className="font-medium text-purple-600 hover:underline dark:text-purple-500"
            >
              Privacy Policy
            </a>
            .
          </p>
        </form>
        <div className="flex justify-end items-end mr-4">
          <button
            onClick={handleUserSave}
            className="text-white hover:text-yellow-400 bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-semibold rounded-lg text-base w-full sm:w-auto px-5 py-2.5 mt-2 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
          >
            Save
          </button>
        </div>
      </div>
      <div className="mx-auto px-16">
        <form className="w-full">
          <div className="mb-4">
            <u className="font-bold text-purple-800 text-xl">Change Password</u>
          </div>
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                className="block appearance-none uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="password"
              >
                Current Password
              </label>
              <input
                onChange={handleChange}
                value={password}
                name="password"
                className="w-full font-semibold bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="curpassword"
                type="password"
              />
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                className="block appearance-none uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="newpassword"
              >
                New Password
              </label>
              <input
                onChange={handleChange}
                value={newpassword}
                name="newpassword"
                className="w-full font-semibold bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="newpassword"
                type="password"
              />
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                className="block appearance-none uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="confpassword"
              >
                Confirm Password
              </label>
              <input
                onChange={handleChange}
                value={confpassword}
                name="confpassword"
                className="w-full font-semibold bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="confpassword"
                type="password"
              />
            </div>
          </div>
        </form>
        <div className="flex justify-end items-end mr-4 mb-4">
          <button
            onClick={handlePasswordChange}
            className="text-white hover:text-yellow-400 bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-semibold rounded-lg text-base w-full sm:w-auto px-5 py-2.5 mt-2 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
          >
            Change
          </button>
        </div>
      </div>
    </>
  );
};

export default MyAccount;
