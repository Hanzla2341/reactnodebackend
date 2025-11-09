const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    email: { type: String, required: true },
    imageKey: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
