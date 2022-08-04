const express = require("express");
const lodash = require("lodash");
const bcrypt = require("bcrypt");
const { userSchema, validateUser } = require("../models/userSchema");
const userRouter = express.Router();
const auth = require("../middleware/authM");
userRouter.get("/me", auth, async (req, res) => {
  const user = await userSchema.findById(req.user._id).select("-password");
  res.send(user);
});
userRouter.get("/", async (req, res) => { 
  const users = await userSchema.find({}).sort("name");
  return res.send(users);
});
userRouter.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    validateUser(req.body);
    let user = await userSchema.findOne({
      name: req.body.name,
      email: req.body.email,
    });
    if (user) return res.status(400).send("The user is already registered...");
    user = new userSchema(
      lodash.pick(req.body, ["name", "password", "email", "isAdmin"])
    );
    user.password = await bcrypt.hash(user.password, salt);
    const newUser = lodash.pick(user, ["name", "email", "_id"]);
    await user.save();
    const token = user.generateAuthToken();
    res.cookie("token", token).send(newUser);
  } catch (error) {
    return res.send(error.message);
  }
});
module.exports = userRouter;
