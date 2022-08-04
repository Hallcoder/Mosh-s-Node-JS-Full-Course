const express = require("express");
const Joi = require("Joi");
const bcrypt = require("bcrypt");
const { userSchema } = require("../models/userSchema");
const authRouter = express.Router();

authRouter.get("/", async (req, res) => {
  const users = await userSchema.find({}).sort("name");
  return res.send(users);
});
authRouter.post("/login", async (req, res) => {
  try {
    validateUser(req.body);
    const user = await userSchema.findOne({
      email: req.body.email,
    });
    if (!user) return res.status(400).send("Invalid email or password...");
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(400).send("Invalid email or password...");

    const token = user.generateAuthToken();

    res.send(token);
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
});
function validateUser(req) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required(),
    password: Joi.string().min(5).max(255).required(),
  });
  return schema.validate(req);
}
module.exports = authRouter;
