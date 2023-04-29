const User = require('../models/Users')
const crypto = require('crypto')
const ErrorResponse = require("../utils/errorResponse")
// const sendMail = require("../utils/sendMail");
exports.register = async (req, res, next) => {
    const { username, email, password } = req.body;

    try {
        const user = await User.create({
            username: username,
            email: email,
            password: password
        })


        sendToken(user, 201, res);
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

        sendToken(user, 200, res);


    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

exports.forgotpassword = async (req, res, next) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            next(new ErrorResponse("User is Not found with the given email", 404));
        }

        const resetToken = user.generatePasswordResetToken();
        // console.log(resetToken);

        await user.save();
        res.status(200).json({ success: true, url: `http://localhost:5000/api/auth/resetpassword:${resetToken}` })

    } catch (error) {
        next(error);
    }



}

exports.resetpassword = async (req, res, next) => {
    // const resetpasswordToken = crypto.createHash('sha256').update(req.params.resetToken.slice(1)).digest("hex");
    const resetPasswordToken = req.params.resetToken.slice(1);

    try {
        const user = await User.findOne({ resetPasswordToken, resetPasswordExpire: { $gt: Date.now() } });

        if (!user) {
            next(new ErrorResponse("Invalid Token", 400))
        }

        user.password = req.body.password;
        user.resetPasswordExpire = undefined;
        user.resetPasswordToken = undefined;
        await user.save();

        res.status(201).json({
            success: true,
            data: "Password Updated Success"
        });

    } catch (error) {
        next(error)
    }
}


const sendToken = (user, statusCode, res) => {
    const token = user.generateSignedToken();
    res.status(statusCode).json({ success: true, token: token });
}
