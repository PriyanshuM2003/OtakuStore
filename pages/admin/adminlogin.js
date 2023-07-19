import { MdLockOutline } from 'react-icons/md';
import { RiAdminFill } from 'react-icons/ri';
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head';
import Router from 'next/router';

const AdminLogin = () => {

    const router = Router
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleChange = (e) => {
        if (e.target.name == 'email') {
            setEmail(e.target.value)
        } else if (e.target.name == 'password') {
            setPassword(e.target.value)
        }
    }

    useEffect(() => {
        if (localStorage.getItem('admin')) {
            router.push('/admin')
        }
    }, [router]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = { email, password }

        let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/adminlogin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        let response = await res.json()
        setEmail('')
        setPassword('')

        if (response.success) {
            const { token, email, name, phone } = response;
            localStorage.setItem('admin', JSON.stringify({ token, email, name, phone }))
            toast.success('You are successfully logged in!', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setTimeout(() => {
                router.push('/admin');
            }, 1000);
        } else {
            toast.error('Invalid Credentials!', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

        }
    }

    return (
        <>
            <Head>
                <title>Otaku Store- AdminLogin</title>
                <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
            </Head>
            <section className="min-h-screen overflow-hidden">
                <div className="min-h-full flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
                    <ToastContainer position="top-center" autoClose={1000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
                    <div className="max-w-md w-full space-y-8">
                        <div>
                            <RiAdminFill className="mx-auto text-yellow-400 bg-purple-900 rounded h-12 w-auto" />
                            <h2 className="mt-6 text-center text-3xl font-extrabold text-purple-800">Login to your admin account</h2>
                            <p className="mt-2 text-center text-sm text-gray-600">
                                Or <br />
                                <Link href={'/admin/adminsignup'}>
                                    <a className="font-medium text-purple-900 hover:text-purple-700">Admin Sign-up</a>
                                </Link>
                            </p>
                        </div>
                        <form onSubmit={handleSubmit} className="mt-8 space-y-6" method="POST">
                            <div className="rounded-md shadow-sm">
                                <div className='my-2'>
                                    <input value={email} onChange={handleChange} id="email-address" name="email" type="email" autoComplete="email" required className="appearance-none rounded  block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" />
                                </div>
                                <div className='my-2'>
                                    <input value={password} onChange={handleChange} id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none rounded  block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" />
                                </div>
                            </div>
                            {/* <div className="flex items-center justify-between">
                                <div className="text-sm">
                                    <Link href={'/forgot'}>
                                        <a className="font-medium text-indigo-600 hover:text-indigo-500"> Forgot your password? </a>
                                    </Link>
                                </div>
                            </div> */}
                            <div>
                                <button type="submit" className="group w-full py-2 px-4 flex items-center justify-center border border-transparent text-base font-semibold rounded-md text-white bg-purple-800 hover:text-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                                    <MdLockOutline className="text-xl lg:mr-40 mr-28" />
                                    <h1 className="text-base lg:mr-40 mr-28">Log in</h1>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AdminLogin;