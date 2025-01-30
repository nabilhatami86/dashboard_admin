const Users = require("../model/Users");
const Products = require("../model/Products");
const Categories = require("../model/Categories");
const Orders = require("../model/Orders");

const addDummyUsers = async (req, res, next) => {
  try {
    const dummyUsers = [
      {
        us_id: "U001",
        us_name: "Budi Santoso",
        us_email: "budi@example.com",
        us_password: "password123",
        us_phone_number: "081234567890",
        us_address: "Jl. Merdeka No.1, Jakarta",
      },
      {
        us_id: "U002",
        us_name: "Siti Aisyah",
        us_email: "siti@example.com",
        us_password: "mypassword",
        us_phone_number: "082345678901",
        us_address: "Jl. Sudirman No.45, Bandung",
      },
    ];

    for (const user of dummyUsers) {
      const existingUser = await Users.findOne({ us_id: user.us_id });
      if (!existingUser) {
        await Users.create({
          ...user,
          us_created_at: new Date(),
          us_updated_at: new Date(),
        });
      }
    }

    res.status(201).json({ message: "Dummy users added successfully!" });
  } catch (error) {
    next(error);
  }
};

const addDummyCategories = async (req, res, next) => {
  try {
    const dummyCategories = [
      { ct_id: "C001", ct_code: "ELC", ct_name: "Electronics" },
      { ct_id: "C002", ct_code: "FUR", ct_name: "Furniture" },
    ];

    for (const category of dummyCategories) {
      const existingCategory = await Categories.findOne({
        ct_id: category.ct_id,
      });
      if (!existingCategory) {
        await Categories.create({
          ...category,
          ct_created_at: new Date(),
          ct_updated_at: new Date(),
        });
      }
    }

    res.status(201).json({ message: "Dummy categories added successfully!" });
  } catch (error) {
    next(error);
  }
};

const addDummyProducts = async (req, res, next) => {
  try {
    const categoryElectronics = await Categories.findOne({ ct_code: "ELC" });
    const categoryFurniture = await Categories.findOne({ ct_code: "FUR" });

    if (!categoryElectronics || !categoryFurniture) {
      return res
        .status(400)
        .json({
          message:
            "Kategori tidak ditemukan. Harap tambah kategori terlebih dahulu.",
        });
    }

    const dummyProducts = [
      {
        pd_id: "P001",
        pd_code: "P-LAPTOP",
        pd_name: "Laptop Gaming ASUS ROG",
        pd_price: 15000000,
        pd_ct_id: categoryElectronics._id,
      },
      {
        pd_id: "P002",
        pd_code: "P-MEJA",
        pd_name: "Meja Kerja Minimalis",
        pd_price: 500000,
        pd_ct_id: categoryFurniture._id,
      },
    ];

    for (const product of dummyProducts) {
      const existingProduct = await Products.findOne({ pd_id: product.pd_id });
      if (!existingProduct) {
        await Products.create({
          ...product,
          pd_created_at: new Date(),
          pd_updated_at: new Date(),
        });
      }
    }

    res.status(201).json({ message: "Dummy products added successfully!" });
  } catch (error) {
    next(error);
  }
};

const addDummyOrders = async (req, res, next) => {
  try {
    const product1 = await Products.findOne({ pd_code: "P-LAPTOP" });
    const product2 = await Products.findOne({ pd_code: "P-MEJA" });

    if (!product1 || !product2) {
      return res
        .status(400)
        .json({
          message:
            "Produk tidak ditemukan. Harap tambah produk terlebih dahulu.",
        });
    }

    const dummyOrders = [
      {
        or_id: "O001",
        Product: product1._id,
        or_amount: 1,
        or_status: "pending",
      },
      {
        or_id: "O002",
        Product: product2._id,
        or_amount: 2,
        or_status: "shipped",
      },
    ];

    for (const order of dummyOrders) {
      const existingOrder = await Orders.findOne({ or_id: order.or_id });
      if (!existingOrder) {
        await Orders.create({
          ...order,
          or_created_at: new Date(),
          or_updated_at: new Date(),
        });
      }
    }

    res.status(201).json({ message: "Dummy orders added successfully!" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addDummyUsers,
  addDummyProducts,
  addDummyCategories,
  addDummyOrders,
};
