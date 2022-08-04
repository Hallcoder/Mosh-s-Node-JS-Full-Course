const express = require("express");
const { customerSchema } = require("../models/customerSchema");
const customerRouter = express.Router();

customerRouter.get("/", async (req, res) => {
  const customers = await customerSchema.find({});
  res.send(customers);
});

customerRouter.get("/:id", async (req, res) => {
  try {
    const customer = await customerSchema.find({ _id: req.params.id });
    res.send(customer);
  } catch (error) {
    return res.send(error.message);
  }
});

customerRouter.post("/", async (req, res) => {
  try {
    const newCustomer = new customerSchema({
      isGold: req.body.isGold,
      name: req.body.name,
      createTime: Date.now(),
      telephone: req.body.telephone,
    });

    const myName = req.body.name;

    const customer = await customerSchema.find({ name: myName });
    if (!customer) {
      return res
        .status(201)
        .send(`"Customer with the name :${req.body.name} already exists "`);
    }

    await newCustomer.save();
    res.send(newCustomer);
  } catch (error) {
    return res.send(error.message);
  }
});

customerRouter.put("/:id", async (req, res) => {
  try {
    const customer = await customerSchema.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      isGold: req.body.isGold,
      CreateTime: Date.now(),
    });
    await customer.save();
    res.send("Course updated" + customer);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

customerRouter.delete("/:id", async (req, res) => {
  const customer = await customerSchema.findByIdAndDelete(req.params.id);
  if (!genre) return res.status(404).send("Genre was not found");
  return res.send("Genre is deleted successfully");
});
module.exports.customerRouter = customerRouter;
