// required modules
require('dotenv').config()
const express = require('express');
const authRouter = require("./routes/auth-router");
const contentRouter = require("./routes/content-router");
const connectDB = require("./utils/db");
const errorMiddleware = require('./middlewares/error-middleware');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/auth", authRouter);
app.use("/api/content", contentRouter);

// error middleware
app.use(errorMiddleware);

// listening to app
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
});