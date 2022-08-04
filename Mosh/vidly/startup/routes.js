const express = require("express")
const genres = require("../genresModule/genres");
const { customerRouter } = require("../routes/customers");
const rentals = require("../routes/rentals");
const movieRouter = require("../routes/movies");
const authRouter = require("../routes/auth");
const error = require("../middleware/error");

const userRouter = require("../routes/users");
const cookie = require("cookie-parser")
module.exports = function (app){
app.use(cookie());
app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/rentals", rentals);
app.use("/api/customers", customerRouter);
app.use("/api/movies", movieRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use(error);
}