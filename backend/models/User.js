const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    repassword: { type: String, required: true },
    razorpay_customer_id: { type: String, default: null },
    last_login: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
