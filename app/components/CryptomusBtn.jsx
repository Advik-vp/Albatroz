"use client";

import { createCryptoPayment } from "../../utils/api";
import React, { useState } from "react";

export default function CryptomusBtn({ amount, disabled }) {
  const [loading, setLoading] = useState(false);
  const orderID = `donate-${Date.now()}`;
  const email = localStorage.getItem("user-email");

  const handleCryptomusPayment = async () => {
    setLoading(true);
    try {
      const response = await createCryptoPayment({
        amount,
        currency: "USD",
        orderId: orderID,
        email,
      });

      if (!response.success) {
        alert("Failed to create payment. Please try again.");
        return;
      }

      const paymentUrl = response.data.payment_url;
      window.open(paymentUrl, "_blank");
    } catch (error) {
      Error("Error during Cryptomus payment:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <button
        onClick={() => alert('Crypto donations coming soon!')}
          // onClick={handleCryptomusPayment}
          disabled={loading || disabled}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2
              rounded-lg shadow disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300"
        >
          {loading ? "Processing..." : "Donate Now (Cryptomus)"}
        </button>
      </div>
    </>
  );
}
