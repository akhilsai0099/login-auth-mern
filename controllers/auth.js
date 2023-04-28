const User = require('../models/Users')

const bcrypt = require("bcryptjs")

exports.register = async (req, res, next) => {
    const { username, email, password } = req.body;

    try {
        const user = await User.create({
            username: username,
            email: email,
            password: password
        })


        res.status(201).json({
            success: true,
            user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })

    }

}

exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ success: false, error: 'please provide a valid email and password' })
    }

    try {
        let user = await User.findOne({ email: email }).select("+password");
        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' })
        }
        const isMatch = await user.matchPasswords(password);

        if (!isMatch) {
            return res.status(404).json({ success: false, error: 'Invalid credentials' })
        }
        res.status(201).json({
            success: true,
            user
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

exports.forgotpassword = (req, res, next) => {
    res.send("forgot Password Route")
}

exports.resetpassword = (req, res, next) => {
    res.send("resetPassword Route")
}


