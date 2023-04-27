import React, { useState } from 'react'
import { useFormik } from "formik";
export default function Register() {
    const [userName, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const formik = useFormik(
        {
            initialValues: { username: "", email: "", password: "" },
            validateOnChange: false,
            validateOnBlur: false,
            onSubmit: async (values) => {
                setUsername(values.userName);
                setEmail(values.email)
                setPassword(values.password)
            }
        }
    );


    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={formik.onSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className='mb-4'>
                    <h2 className='text-2xl text-gray-900 items-center font-bold'>Create an Account Now!!</h2>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="username">
                        Username
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username"
                        type="text"
                        placeholder="Username"
                        value={userName}
                        onChange={(e) => { setUsername(e.target.value) }}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="******************"
                        value={password}
                        onChange={e => { setPassword(e.target.value) }}
                    />
                </div>
                <div className="flex items-center justify-center">
                    <button className="bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Sign Up
                    </button>
                </div>
            </form>
        </div>
    )
}
