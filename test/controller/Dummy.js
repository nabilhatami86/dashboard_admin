const Users = require("../model/Users");
const Products = require("../model/Products");
const Categories = require("../model/Categories");
const Orders = require("../model/Orders");
const { faker } = require("@faker-js/faker");
const crypto = require("crypto");

// ✅ Tambah 100 Users Dummy
const addDummyUsers = async (req, res) => {
  try {
    let users = [];
    for (let i = 1; i <= 100; i++) {
      users.push({
        us_id: `U${faker.string.numeric(4)}`,
        us_name: faker.person.fullName(),
        us_email: faker.internet.email(),
        us_password: faker.internet.password(),
        us_phone_number: faker.phone.number("08##########"),
        us_address: faker.location.streetAddress(),
        us_created_at: new Date(),
        us_updated_at: new Date(),
      });
    }
    await Users.insertMany(users);
    res.json({ message: "✅ 100 Users Added!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Tambah Kategori
const addDummyCategories = async (req, res) => {
  try {
    const categories = [
      { ct_id: "C001", ct_code: "ELC", ct_name: "Electronics" },
      { ct_id: "C002", ct_code: "FUR", ct_name: "Furniture" },
      { ct_id: "C003", ct_code: "CLT", ct_name: "Clothing" },
      { ct_id: "C004", ct_code: "FOD", ct_name: "Food & Beverage" },
    ];
    await Categories.insertMany(categories);
    res.json({ message: "✅ Categories Added!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Tambah 200 Produk Dummy
const addDummyProducts = async (req, res) => {
  try {
    const categories = await Categories.find();
    let products = [];

    for (let i = 1; i <= 200; i++) {
      let category = categories[Math.floor(Math.random() * categories.length)];
      let productId = `P-${crypto.randomUUID().slice(0, 8)}`;
      let productCode = `P-${faker.commerce.productAdjective()}-${faker.string.numeric(
        3
      )}`;

      // Cek apakah pd_id atau pd_code sudah ada
      const existingProduct = await Products.findOne({
        $or: [{ pd_id: productId }, { pd_code: productCode }],
      });

      if (existingProduct) {
        i--; // Ulangi loop jika duplikasi ditemukan
        continue;
      }

      products.push({
        pd_id: productId,
        pd_code: productCode,
        pd_name: faker.commerce.productName(),
        pd_price: faker.number.int({ min: 50000, max: 5000000 }),
        pd_ct_id: category._id,
        pd_created_at: new Date(),
        pd_updated_at: new Date(),
      });
    }

    await Products.insertMany(products);
    res.json({ message: "✅ 200 Products Added!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Tambah 500 Orders Dummy
const addDummyOrders = async (req, res) => {
  try {
    const products = await Products.find({}, "_id");
    console.log(products);

    if (products.length === 0) {
      return res.status(404).json({ error: "❌ No Products Found!" });
    }

    let orders = [];

    for (let i = 1; i <= 500; i++) {
      let productId = products[i % products.length]._id;

      let orderId = `O-${crypto.randomUUID().slice(0, 8)}`;
      let orderStatus = ["pending", "shipped", "delivered", "cancel"][
        Math.floor(Math.random() * 4)
      ];

      // Cek apakah order ID sudah ada
      const existingOrder = await Orders.findOne({ or_id: orderId });
      if (existingOrder) {
        i--; // Jika duplikat, ulangi loop
        continue;
      }

      orders.push({
        or_id: orderId,
        Product: productId, // ✅ Pastikan ID produk diambil dari database
        or_amount: faker.number.int({ min: 1, max: 5 }),
        or_status: orderStatus,
        or_created_at: new Date(),
        or_updated_at: new Date(),
      });
    }

    await Orders.insertMany(orders);
    res.json({ message: "✅ 500 Orders Added!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔥 Hitung Total Pendapatan dari Order yang "Delivered"
const calculateTotalRevenue = async (req, res) => {
  try {
    const deliveredOrders = await Orders.find({
      or_status: "delivered",
    }).populate("Product");

    let totalRevenue = 0;
    deliveredOrders.forEach((order) => {
      if (order.Product) {
        totalRevenue += order.or_amount * order.Product.pd_price;
      }
    });

    res.json({
      total_revenue: `Rp ${totalRevenue.toLocaleString("id-ID")}`,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addDummyUsers,
  addDummyCategories,
  addDummyProducts,
  addDummyOrders,
  calculateTotalRevenue,
};
