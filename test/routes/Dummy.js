const express = require("express");
const {
  addDummyUsers,
  addDummyCategories,
  addDummyProducts,
  addDummyOrders,
  calculateTotalRevenue,
} = require("../controller/Dummy");

const router = express.Router();

router.post("/dummy/users", addDummyUsers);
router.post("/dummy/categories", addDummyCategories);
router.post("/dummy/products", addDummyProducts);
router.post("/dummy/orders", addDummyOrders);
router.get("/dummy/revenue", calculateTotalRevenue);

module.exports = router;
