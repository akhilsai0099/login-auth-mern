const jwt = require('jsonwebtoken');
const User = require('../models/Users');
const ErrorResponse = require("../utils/errorResponse")

exports.protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        // Token in headers looks like {Bearer ths23422tnd1rs1....}
        token = req.headers.authorization.split(" ")[1]
    }

    if (!token) {
        return next(new ErrorResponse("Not authorized to access this route", 401))
    }

    try {
        const decoded = jwt.verify(token, 'da5977790902649e4661df75a45da474ecd211e40ca227780ad25f7e8e18a2723b870b');

        const user = await User.findById(decoded.id);

        if (!user) {
            return next(new ErrorResponse("no user found with this id", 404));
        }
        req.user = user;

        next()

    } catch (error) {
        return (new ErrorResponse("Not authorized", 401))
    }

}