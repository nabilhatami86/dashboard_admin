const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/Products");

const router = express.Router();

router.get("/product", getAllProducts);
router.post("/product", createProduct);
router.put("/product/:id", updateProduct);
router.delete("/product/:id", deleteProduct);

module.exports = router;
