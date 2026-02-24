require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Razorpay = require("razorpay");
const bodyParser = require("body-parser");
const fs = require("fs");
const paymentRoutes = require("./routes/payment");
const authRoutes = require("./routes/auth");

const app = express();
app.use(cors({
  origin: [
    "http://localhost:3001",
    "http://localhost:3000"
  ],
  credentials: true
}));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/payment", paymentRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(5000, () => console.log("🚀 Server running on port 5000"));
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
  });

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});
const ORDERS_FILE = "orders.json";
const readData = () => {
  if (fs.existsSync(ORDERS_FILE)) {
    const data = fs.readFileSync(ORDERS_FILE);
    return JSON.parse(data);
  }
  return [];
};

const writeData = (data) => {
  fs.writeFileSync(ORDERS_FILE, JSON.stringify(data, null, 2));
};

if (!fs.existsSync(ORDERS_FILE)) {
  writeData([]);
}
