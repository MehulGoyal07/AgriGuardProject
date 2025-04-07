const Order = require("../models/Order");

exports.createOrder = async (req, res) => {
  try {
    const order = new Order({ ...req.body, user: req.user.id });
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: "Failed to place order" });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate("products.product");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};
