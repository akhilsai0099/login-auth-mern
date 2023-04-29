const mongoose = require('mongoose')
const bcrypt = require("bcryptjs")
const crypto = require("crypto")
const jwt = require("jsonwebtoken")

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please Provide a username"]
    },
    email: {
        type: String,
        required: [true, "Please Provide a email"],
        unique: true,
        match: [
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, "Please provide a valid email"
        ]
    },
    password: {
        type: String,
        required: [true, "Please Provide a password"],
        minlength: 6,
        select: false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
});

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})
UserSchema.methods.matchPasswords = async function (password) {
    return await bcrypt.compare(password, this.password);
}

UserSchema.methods.generateSignedToken = function () {
    return jwt.sign({ id: this._id }, 'da5977790902649e4661df75a45da474ecd211e40ca227780ad25f7e8e18a2723b870b', { expiresIn: '10min' })
}

UserSchema.methods.generatePasswordResetToken = function () {
    const token = crypto.randomBytes(32).toString("hex");
    this.resetPasswordToken = crypto.createHash('sha256').update(token).digest("hex");
    this.resetPasswordExpire = Date.now() + 10 * (60 * 1000);

    return this.resetPasswordToken;
}

const User = mongoose.model("User", UserSchema);




module.exports = User;