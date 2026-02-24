const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const { createSignature } = require("../../utils/api");
require("dotenv").config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

router.get("/", (req, res) => {
  res.send("Auth route is working");
});

router.post("/create-order", async (req, res) => {
  const { amount, customer_id } = req.body;

  try {
    const options = {
      amount: amount * 100, // Convert to paise
      currency: "INR",
      receipt: "donation_rcptid_" + Date.now(),
      payment_capture: 1,
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    console.error("Razorpay error:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.get("/payment-history", async (req, res) => {
  try {
    const customer_id = req.query.customer_id;
    const email = req.query.email;

    if (!customer_id)
      return res.status(400).json({ error: "Missing customer_id" });

    const result = await razorpay.payments.all({ customer_id, count: 100 });

    // Filter by email manually
    const filteredPayments = result.items.filter(
      (payment) => payment.email === email || payment.notes?.email === email
    );

    if (filteredPayments.length === 0) {
      res.json({
        message: "No payments found",
        status: 404,
      });
    } else {
      res.json(filteredPayments, { status: 200 });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Cryptomus routes

router.post("/create-payment", async (req, res) => {
  const { amount, currency, orderId, email } = req.body;

  const paymentData = {
    amount,
    currency,
    order_id: orderId,
    url_return: "https://daanmitra.vercel.app/pages/user/start-donation",
    url_callback: "https://daanmitraserver.onrender.com/payment-webhook",
    buyer_email: email,
    is_test: 1,
  };

  const sign = createSignature(paymentData, process.env.CRYPTOMUS_API_KEY);

  try {
    const response = await fetch("https://api.cryptomus.com/v1/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        merchant: process.env.CRYPTOMUS_MERCHANT_UUID,
        sign: sign,
      },
      body: JSON.stringify(paymentData),
    });

    const result = await response.json();
    res.json(result);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Failed to create payment" });
  }
});

router.post("/payment-webhook", express.json(), (req, res) => {
  const { status, order_id, amount } = req.body;
  console.log("Webhook received:", req.body);

  if (status === "paid") {
    console.log(`✅ Donation ${order_id} paid: ${amount}`);
    // Save to DB or update status
  }

  res.status(200).json({ message: "Webhook received" });
});

module.exports = router;
