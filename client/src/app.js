import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// importing the components 
import Username from './components/Username'
import HomePage from './components/Homepage'
import OtpVerification from './components/OtpVerification'
import PasswordReset from './components/PasswordReset'
import Profile from './components/Profile'
import Recovery from './components/Recovery'
import Register from './components/Register'
import PageNotFound from './components/PageNotFound'


const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage></HomePage>
    },
    {
        path: '/login',
        element: <Username></Username>
    },
    {
        path: '/register',
        element: <Register></Register>
    },
    {
        path: '/profile',
        element: <Profile></Profile>
    },
    {
        path: '/recovery',
        element: <Recovery></Recovery>
    },
    {
        path: '/reset',
        element: <PasswordReset></PasswordReset>
    },
    {
        path: '/otpVerify',
        element: <OtpVerification></OtpVerification>
    },
    {
        path: '*',
        element: <PageNotFound></PageNotFound>
    }
])

export default function App() {
    return (
        <main>
            <RouterProvider router={router}></RouterProvider>
        </main>
    )
}
