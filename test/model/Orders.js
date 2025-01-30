const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  or_id: {
    type: String,
    required: true,
    unique: true,
  },
  Product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  or_amount: {
    type: Number,
    required: true,
  },
  or_status: {
    type: String,
    enum: ["pending", "shipped", "delivered", "cancel"],
    default: "pending",
  },
  or_created_at: {
    type: Date,
    default: Date.now,
  },
  or_updated_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);
