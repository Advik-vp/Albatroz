const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

router.get("/", (req, res) => {
  res.send("Auth route is working");
});

// Register
router.post("/register", async (req, res) => {
  const { firstname, lastname, email, password, repassword } = req.body;

  if (!firstname || !lastname || !email || !password || !repassword) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (password !== repassword) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ error: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      repassword: hashedPassword,
    });
    await newUser.save();

    return res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message || "Server error" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: "Invalid password" });

    // Check if user already has a Razorpay customer ID
    if (!user.razorpay_customer_id) {
      // Create Razorpay customer
      const customer = await razorpay.customers.create({
        name: user.name,
        email: user.email,
        contact: "9999999999", // if you store contact number in user model, add it here
      });

      // Save razorpay_customer_id in user document
      user.razorpay_customer_id = customer.id;
      await user.save();
    }

    if (user.last_login || !user.last_login) {
      const now = new Date();
      const formatted = now
        .toLocaleString("en-IN", {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
          timeZone: "Asia/Kolkata",
        })
        .replace(/,/g, "");
      user.last_login = formatted;
      await user.save();
    }

    res.status(200).json({
      message: "Login successful",
      user: { id: user._id },
    });
  } catch (err) {
    return res.status(500).json({ error: err.message || "Server error" });
  }
});

// Logout
router.post("/logout", (req, res) => {
  res.status(200).json({
    message: "Logout successful",
  });
});

// Get user details
router.post("/user", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    res.status(200).json({
      message: "User data retrieved successfully",
      user: {
        id: user._id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        password: user.password,
        razorpay_customer_id: user.razorpay_customer_id,
        last_login: user.last_login,
      },
    });
  } catch (err) {
    return res.status(500).json({ error: err.message || "Server error" });
  }
});

module.exports = router;
