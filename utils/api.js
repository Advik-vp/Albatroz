export async function resetPassword(email) {
  try {
    const res = await fetch(`${BASE_URL}/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    if (!res.ok) {
      return { success: false, message: data.error || "Password reset failed" };
    }
    return { success: true, message: data.message || "Password reset email sent" };
  } catch (err) {
    return { success: false, message: "Network error" };
  }
}
import crypto from "crypto";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000/api/auth";
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000/api/payment";

export async function registerUser(userData) {
  try {
    const res = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const data = await res.json();

    if (!res.ok) {
      return { success: false, message: data.error || "Registration failed" };
    }

    return { success: true, data };
  } catch (err) {
    return { success: false, message: "Network error" };
  }
}

export async function loginUser(credentials) {
  try {
    const res = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const data = await res.json();
    if (!res.ok) {
      return { success: false, message: data.error || "Login failed" };
    }

    return { success: true, data };
  } catch (err) {
    return { success: false, message: "Network error" };
  }
}

export async function logoutUser() {
  try {
    const res = await fetch(`${BASE_URL}/logout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    if (!res.ok) {
      return { success: false, message: data.error || "Logout failed" };
    }

    return { success: true, data };
  } catch (err) {
    return { success: false, message: "Network error" };
  }
}

export async function createOrder(amount, customer_id) {
  try {
    const result = await fetch(`${SERVER_URL}/create-order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, customer_id }),
    });

    const data = await result.json();
    if (!result.ok) {
      return { success: false, message: data.error || "Order creation failed" };
    }

    return { success: true, data };
  } catch (err) {
    return { success: false, message: "Network error" };
  }
}

export async function userdetails(useremail) {
  try {
    const res = await fetch(`${BASE_URL}/user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: useremail }),
    });
    const data = await res.json();
    return { success: true, data };
  } catch (err) {
    return { success: false, message: "Network error" };
  }
}

export async function getPaymentHistory(customerid, email) {
  try {
    const res = await fetch(
      `${SERVER_URL}/payment-history?customer_id=${customerid}&email=${email}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = await res.json();
    if (!res.ok) {
      return {
        success: false,
        message: data.error || "Failed to fetch payment history",
      };
    }

    return { success: true, data };
  } catch (err) {
    return { success: false, message: "Network error" };
  }
}

// Cryptomus API Integration and Signature Hashing
export function createSignature(data, apiKey) {
  const json = JSON.stringify(data);
  return crypto
    .createHash("sha256")
    .update(json + apiKey)
    .digest("hex");
}

export async function createCryptoPayment({
  amount,
  currency,
  orderId,
  email,
}) {
  try {
    const response = await fetch(`${SERVER_URL}/create-payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount, currency, orderId, email }),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("API error:", error);
    throw new Error("Unable to create payment");
  }
}

// Uncomment this function if you need to update user data

// export async function updateUserData(userId, userData) {
//   try {
//     const res = await fetch(`${BASE_URL}/user/${userId}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(userData),
//     });

//     const data = await res.json();
//     if (!res.ok) {
//       return { success: false, message: data.error || "Failed to update user data" };
//     }

//     return { success: true, data };
//   } catch (err) {
//     return { success: false, message: "Network error" };
//   }
// }
