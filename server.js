
const express = require("express");
const connectDB = require("./config/db")

connectDB();
const app = express();

app.use(express.json());
app.use('/api/auth', require('./routes/auth'));

const PORT = 5000;


const server = app.listen(PORT, () => { console.log(`Listening on port http://localhost:${PORT}`) });

process.on("unhandledRejection", (err, promise) => {
    console.log(`loging error ${err}`);
    server.close(() => process.exit(1));
})


