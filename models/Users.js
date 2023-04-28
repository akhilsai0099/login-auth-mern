const mongoose = require('mongoose')
const bcrypt = require("bcryptjs")
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

UserSchema.pre("save", async function () {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

})
UserSchema.methods.matchPasswords = async function (password) {
    return await bcrypt.compare(password, this.password);
}
const User = mongoose.model("User", UserSchema);




module.exports = User;