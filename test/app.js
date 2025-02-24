const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/connection");

const userRoutes = require("./routes/Users");
const productRoutes = require("./routes/Products");
const categoryRoutes = require("./routes/Categories");
const orderRoutes = require("./routes/Orders");
const dataRoutes = require("./routes/Dummy");
const authRouter = require("./routes/Auth");
const adminRoutes = require("./routes/Admin");

connectDB();

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use("/api", userRoutes);
app.use("/api", authRouter);
app.use("/api", productRoutes);
app.use("/api", categoryRoutes);
app.use("/api", orderRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/data", dataRoutes);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
