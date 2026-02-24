"use client";

import React, { useState } from "react";

import { createOrder } from "@/utils/api";

export default function RazorpayBtn({ amount, disabled }) {
  const [loading, setLoading] = useState(false);
  const [upiId, setUpiId] = useState("");
  const [upiError, setUpiError] = useState("");

  // UPI ID validation regex: e.g. name@bank
  const upiRegex = /^[a-zA-Z0-9\.\-_]{2,256}@[a-zA-Z]{2,64}$/;

  const validateUpiId = (id) => {
    if (!upiRegex.test(id)) {
      setUpiError("Enter a valid UPI ID (e.g. yourname@okaxis)");
      return false;
    }
    setUpiError("");
    return true;
  };
  const email = localStorage.getItem("user-email");
  const customer_id = localStorage.getItem("customer_id");
  const firstname = localStorage.getItem("customer_name");
  const lastname = localStorage.getItem("customer_lastname");
  const username = firstname + " " + lastname;

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleRazorpay = async () => {
    const res = await loadRazorpayScript();
    if (!res) {
      alert("Razorpay SDK failed to load.");
      return;
    }
    setLoading(true);
    try {
      const response = await createOrder(amount, customer_id);

      if (!response.success) {
        alert("Failed to create order. Please try again.");
        return;
      }

      const order = await response.data;

      // Check if Razorpay script is loaded
      if (!window.Razorpay) {
        alert(
          "Razorpay SDK failed to load. Please check your internet connection."
        );
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Razorpay key_id
        amount: order.amount,
        currency: order.currency,
        name: "Albatroz",
        description: "Albatroz Donation Payment",
        order_id: order.id, // From backend
        handler: function (response) {
          window.location.href = "/pages/user/start-donation";
        },
        prefill: {
          name: username,
          email: email,
          contact: "9999999999",
        },
        method: {
          upi: true,
        },
        upi: {
          flow: "collect",
        },
        notes: {
          upi_id: upiId,
        },
        theme: {
          color: "#8B5CF6",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      Error("Error during Razorpay payment:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter your UPI ID"
          value={upiId}
          onChange={e => {
            setUpiId(e.target.value);
            validateUpiId(e.target.value);
          }}
          className="border rounded px-3 py-2 w-full mb-2"
        />
        {upiError && (
          <div className="text-red-500 text-sm mb-2">{upiError}</div>
        )}
        <button
          onClick={handleRazorpay}
          disabled={loading || disabled || !upiId || !!upiError}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2
              rounded-lg shadow disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300"
        >
          {loading ? "Processing..." : "Donate Now (Razorpay)"}
        </button>
      </div>
    </>
  );
}
