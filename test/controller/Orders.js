const Orders = require("../model/Orders");

const getAllOrders = async (req, res) => {
  try {
    const orders = await Orders.find().populate("Product");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
};

const createOrder = async (req, res) => {
  const { or_id, or_pd_id, or_amount } = req.body;

  try {
    const newOrder = new Orders({
      or_id,
      or_pd_id,
      or_amount,
      or_status,
    });

    await newOrder.save();
    res.status(201).json({ message: "Order created successfully", newOrder });
  } catch (error) {
    res.status(500).json({ message: "Error creating order", error });
  }
};

const updateOrder = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedOrder = await Orders.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!updatedOrder)
      return res.status(404).json({ message: "Order not found" });

    res
      .status(200)
      .json({ message: "Order updated successfully", updatedOrder });
  } catch (error) {
    res.status(500).json({ message: "Error updating order", error });
  }
};

const deleteOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedOrder = await Orders.findByIdAndDelete(id);
    if (!deletedOrder)
      return res.status(404).json({ message: "Order not found" });

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting order", error });
  }
};

module.exports = { getAllOrders, createOrder, updateOrder, deleteOrder };
