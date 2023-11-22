import React, { useEffect, useState } from "react";
import Link from "next/link";
import { MdLockOutline } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";
import Router from "next/router";

const AdminSignup = () => {
  const router = Router;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Skey, setSkey] = useState("");

  useEffect(() => {
    if (localStorage.getItem("admin")) {
      router.push("/admin");
    }
  }, []);

  const handleChange = async (e) => {
    if (e.target.name == "Skey") {
      setSkey(e.target.value);
    } else if (e.target.name == "name") {
      setName(e.target.value);
    } else if (e.target.name == "phone") {
      setPhone(e.target.value);
    } else if (e.target.name == "email") {
      setEmail(e.target.value);
    } else if (e.target.name == "password") {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Skey === process.env.NEXT_PUBLIC_ADMIN_SignUp_SECRET) {
      const data = { name, phone, email, password };
      let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/adminsignup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      let response = await res.json();
      console.log(response);
      setName("");
      setPhone("");
      setEmail("");
      setPassword("");
      toast.success("Accounct created successfully!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        router.push(`${process.env.NEXT_PUBLIC_HOST}/admin/adminlogin`);
      }, 1000);
    } else {
      toast.error("Invalid Secret Key. Signup failed!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    }

    try {
      const emailResult = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/mailer`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            recipient: email,
            subject: "Welcome Admin to Otaku Store",
            htmlContent: `<body style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
            <h1 style="font-size: 28px; font-weight: bold; color: #2e3d49; text-align: center;">
            <span style="color: #673ab7;">OTAKU STORE</span>
            </h1>
            
            <p style="font-size: 18px; color: #2e3d49; text-align: center;">
            <strong>Welcome Admin to OTAKU STORE!</strong> <br>
            Thank you for joining as a admin with us.
            </p>
            <p style="font-size: 14px; color: #888; text-align: center;">
            Best Regards,<br>
            OTAKU STORE Team
            </p>
            </div>
            </body>`,
          }),
        }
      );

      if (emailResult.ok) {
        console.log("Email sent successfully!");
      } else {
        console.error("Failed to send email");
      }
    } catch (error) {
      console.error("Error:", error);
    }

  };

  return (
    <>
      <Head>
        <title>Otaku Store- Admin SignUp</title>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"
        />
      </Head>
      <section className="min-h-screen overflow-hidden">
        <ToastContainer
          position="top-center"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <div className="container p-4 mx-auto">
          <div className="lg:w-4/5 mx-auto flex justify-center items-center flex-wrap">
            <div className="min-h-full w-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
              <div className="min-w-md w-full space-y-8">
                <div>
                  <RiAdminFill className="mx-auto text-yellow-400 bg-purple-900 rounded h-12 w-auto" />
                  <h2 className="mt-6 text-center text-3xl font-extrabold text-purple-800">
                    Admin Sign up
                  </h2>
                  <p className="mt-2 text-center text-sm text-gray-600">
                    Or <br />
                    <Link
                      href={"/admin/adminlogin"}
                      className="font-bold text-purple-900 hover:text-purple-700"
                    >
                      Admin Login
                    </Link>
                  </p>
                </div>
                <form onSubmit={handleSubmit} className="w-full" method="POST">
                  <div className="flex flex-wrap -mx-3 ">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label
                        className="block appearance-none uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="Skey"
                      >
                        Secret Key
                      </label>
                      <input
                        onChange={handleChange}
                        value={Skey}
                        name="Skey"
                        required
                        className="w-1/2 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="Skey"
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 ">
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
                        required
                        className="w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="name"
                        type="text"
                      />
                    </div>
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
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
                        required
                        name="phone"
                        className="w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="phone"
                        type="text"
                        placeholder="Please enter your 10 digit mobile no."
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 mt-6 px-3">
                      <label
                        htmlFor="email"
                        className="block appearance-none uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      >
                        Your Email
                      </label>
                      <input
                        onChange={handleChange}
                        value={email}
                        type="email"
                        name="email"
                        required
                        id="email"
                        aria-describedby="helper-text-explanation"
                        className="w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      />
                    </div>
                    <div className="w-full md:w-1/3 px-3 mt-6 md:mb-0">
                      <label
                        className="block appearance-none uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="password"
                      >
                        Password
                      </label>
                      <input
                        onChange={handleChange}
                        value={password}
                        required
                        name="password"
                        className="w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="password"
                        type="password"
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
                  <div className="flex justify-center items-center mr-4 mt-8">
                    <button
                      type="submit"
                      className="group py-2 px-4 flex items-center justify-center border border-transparent text-base font-semibold rounded-md text-white bg-purple-800 hover:text-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    >
                      <MdLockOutline className="text-xl lg:mr-24 mr-16" />
                      <h1 className="text-base lg:mr-24 mr-16">Create Admin</h1>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminSignup;
