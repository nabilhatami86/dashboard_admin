const express = require("express");
const {
  getAllOrders,
  createOrder,
  updateOrder,
  deleteOrder,
} = require("../controller/Orders");

const router = express.Router();

router.get("/order", getAllOrders);
router.post("/order", createOrder);
router.put("/order/:id", updateOrder);
router.delete("/order/:id", deleteOrder);

module.exports = router;
