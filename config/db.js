const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect('mongodb://localhost:27017/user-auth-mern', {
        useNewURLParser: true,
        useUnifiedTopology: true,
    })
}

module.exports = connectDB