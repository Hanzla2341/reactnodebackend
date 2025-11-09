const User = require('../models/user');
const Order = require("../models/orders");
const bcrypt = require('bcryptjs');

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// New signin controller
exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: 'Invalid email or password' });

    // Compare password securely
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: 'Invalid email or password' });

    // Optional: Generate JWT and send it (not shown here)
    res.status(200).json({ message: 'Signin successful' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
exports.updatePassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Find the user by email and update their password
    const user = await User.findOneAndUpdate(
      { email },
      { $set: { password: hashedPassword } }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("updatePassword error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};






// ✅ POST /api/orders — Create an order
exports.createOrder = async (req, res) => {
  const { name, price, quantity, email, imageKey } = req.body;
  if (!name || !price || !quantity || !email || !imageKey) {
    return res.status(400).json({ message: "Missing fields" });
  }

  try {
    const order = new Order({ name, price, quantity, email, imageKey });
    const savedOrder = await order.save();
    return res.status(201).json(savedOrder);
  } catch (err) {
    console.error("Error saving order:", err);
    return res.status(500).json({ message: "Error saving order" });
  }
};

// ✅ GET /api/orders — Fetch all orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    return res.json(orders);
  } catch (err) {
    console.error("Error fetching orders:", err);
    return res.status(500).json({ message: "Error fetching orders" });
  }
};



