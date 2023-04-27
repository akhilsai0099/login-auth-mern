import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik';
import userpng from './user.png';

import Navbar from './Navbar'

export default function Username() {
    const [username, setUsername] = useState("");
    const navigate = useNavigate();
    const formik = useFormik({
        validateOnChange: false,
        validateOnBlur: false,
        //username validation
        initialValues: { username: '123@example.com' },
        onSubmit: async (values) => {
            setUsername(values.username);
            navigate('/password');
        }
    })
    return (
        <>

            <Navbar></Navbar>
            <div className="container mx-auto">
                <div>
                    <div className="flex flex-col justify-center items-center h-screen">
                        <div className="title flex flex-col items-center">
                            <h4 className='text-5xl font-bold'>Hello Again!!</h4>
                            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>Kick start your Coding Journey</span>
                        </div>
                        {/* change the onSubmit function  */}
                        <form onSubmit={formik.onSubmit} className='py-1 flex flex-col justify-center items-center'>
                            <div className="profile  py-4">
                                <img src={userpng} alt='Profile' className='h-22 w-22' />
                            </div>

                            <div className='textBox '>
                                <input type="text" placeholder='Username' value={username} onChange={(e) => { setUsername(e.target.value) }} className='mx-2' />
                                <button type="submit" className='font-bold text-green-800'>Let's Go</button>
                            </div>
                            <div className="textcenter my-10">
                                <span>Don't have an Account?? <Link to='/register'>SignUp</Link></span>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </>
    )
}
