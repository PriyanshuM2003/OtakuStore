import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { MdAccountCircle, MdLockOutline } from "react-icons/md";
import { useRouter } from "next/router";

const Forgot = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [npassword, setNpassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  useEffect(() => {
    if (localStorage.getItem("myuser")) {
      router.push("/");
    }
  }, []);

  const sendResetEmail = async () => {
    let data = {
      email,
      sendMail: true,
    };
    let send = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgot`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let res = await send.json();
    if (res.success) {
      console.log("email sent");
    } else {
      console.log("error");
    }
  };

  const resetPassword = async () => {
    if (npassword == cpassword) {
      let data = {
        npassword,
        sendMail: false,
      };
      let resetP = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgot`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      let res = await resetP.json();
      if (res.success) {
        console.log("password reset");
      } else {
        console.log("error");
      }
    } else {
      console.log("error error");
    }
  };

  const handleChange = async (e) => {
    if (e.target.name == "npassword") {
      setNpassword(e.target.value);
    }
    if (e.target.name == "cpassword") {
      setCpassword(e.target.value);
    }
    if (e.target.name == "email") {
      setEmail(e.target.value);
    }
  };

  return (
    <>
      <Head>
        <title>Otaku Store- Forgot</title>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"
        />
      </Head>
      <section className="min-h-screen overflow-hidden">
        <div className="min-h-full flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div>
              <MdAccountCircle className="mx-auto text-yellow-400 bg-purple-900 rounded-full h-12 w-auto" />
              <h2 className="mt-6 text-center text-3xl font-extrabold text-purple-800">
                Reset your password
              </h2>
              <h1 className="mt-2 text-center text-sm text-gray-600">
                Or <br />
                <Link href={"/login"} legacyBehavior>
                  <p className="font-bold cursor-pointer text-purple-900 hover:text-purple-700">
                    {" "}
                    Login
                  </p>
                </Link>
              </h1>
            </div>
            {router.query.token && (
              <form className="mt-8 space-y-6" action="#" method="POST">
                <div className="rounded-md shadow-sm">
                  <div className="my-2">
                    <input
                      onChange={handleChange}
                      id="npassword"
                      name="npassword"
                      value={npassword}
                      type="password"
                      autoComplete="password"
                      required
                      className="appearance-none rounded  block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="New Password"
                    />
                  </div>
                  <div className="my-2">
                    <input
                      onChange={handleChange}
                      id="cpassword"
                      name="cpassword"
                      value={cpassword}
                      type="password"
                      autoComplete="password"
                      required
                      className="appearance-none rounded  block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Confirm password"
                    />
                  </div>
                </div>
                <div>
                  <button
                    onClick={resetPassword}
                    disabled={npassword !== cpassword}
                    type="submit"
                    className="group w-full py-2 px-4 flex items-center justify-center border border-transparent text-base font-semibold rounded-md text-white bg-purple-800 hover:text-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:bg-slate-500 disabled:hover:text-white"
                  >
                    <MdLockOutline className="text-xl lg:mr-40 mr-28" />
                    <h1 className="text-base lg:mr-40 mr-28">Continue</h1>
                  </button>
                </div>
              </form>
            )}
            {!router.query.token && (
              <form className="mt-8 space-y-6" action="#" method="POST">
                <div className="rounded-md shadow-sm">
                  <div className="my-2">
                    <input
                      onChange={handleChange}
                      id="email-address"
                      name="email"
                      value={email}
                      type="email"
                      autoComplete="email"
                      required
                      className="appearance-none rounded block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Email address"
                    />
                  </div>
                </div>
                <div>
                  <button
                    onClick={sendResetEmail}
                    type="submit"
                    className="group w-full py-2 px-4 flex items-center justify-center border border-transparent text-base font-semibold rounded-md text-white bg-purple-800 hover:text-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  >
                    <MdLockOutline className="text-xl lg:mr-40 mr-28" />
                    <h1 className="text-base lg:mr-40 mr-28">Continue</h1>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Forgot;
