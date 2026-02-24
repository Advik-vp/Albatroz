"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Sidebar from "../../../components/Sidebar";
import { getPaymentHistory, userdetails } from "../../../../utils/api";
import { format } from "date-fns";

const donationOptions = [
  {
    title: "Smile Foundation",
    description:
      "It empowers underprivileged children, youth, and women through access to education, healthcare, and livelihood opportunities.",
    logo: "https://www.smilefoundationindia.org/wp-content/uploads/2024/07/SMILE-FOUNDATION-LOGO-e1662456150120-1-300x235.png",
  },
  {
    title: "Goonj",
    description:
      "It addresses basic but neglected needs like clothing, hygiene, and rural development using urban surplus as a tool for development.",
    logo: "https://goonj.org/wp-content/uploads/2020/06/Goonj-logo-10June20.png",
  },
  {
    title: "Akshaya Patra",
    description:
      "It ensures that no child in India is deprived of education due to hunger.",
    logo: "https://www.akshayapatra.org/includefiles/settings/logo1.png",
  },
  {
    title: "GiveIndia",
    description:
      "It alleviates poverty by enabling the world to give more effectively and transparently.",
    logo: "https://cfstatic.give.do/4a8e5f5d-659d-4558-8ae9-378ec1e92b1b.webp",
  },
];

export default function Dashboard() {
  const router = useRouter();
  const [totalDonated, setTotalDonated] = useState(0);
  const [lastTransaction, setLastTransaction] = useState(0);
  const [username, setUsername] = useState("User");
  const [lastlogin, setLastlogin] = useState("fetching...");
  const [expandedIdx, setExpandedIdx] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const useremail = localStorage.getItem("user-email");
      const res = await userdetails(useremail);
      if (res.success) {
        setUsername(res.data.user.firstname);
        setLastlogin(res.data.user.last_login);
        localStorage.setItem("customer_id", res.data.user.razorpay_customer_id);
        localStorage.setItem("customer_name", res.data.user.firstname);
        localStorage.setItem("customer_lastname", res.data.user.lastname);
      } else {
        Error("Error fetching user details:", res.message);
      }
    };
    fetchUserDetails();

    const customerid = localStorage.getItem("customer_id");
    const email = localStorage.getItem("user-email");
    const fetchTransactionHistory = async () => {
      const res = await getPaymentHistory(customerid, email);
      if (res.success) {
        if (res.data.status === 404) {
          setLastTransaction(0);
        } else {
          setLastTransaction(res.data[0]);
          const totalAmount = res.data
            .filter((item) => item.status === "captured")
            .reduce((sum, item) => sum + item.amount, 0);
          setTotalDonated(totalAmount);
        }
      } else {
        Error("Error fetching user details:", res.message);
      }
    };
    fetchTransactionHistory();
  }, []);

  return (
    <div className="flex min-h-screen bg-purple-100 text-gray-900">
      <Sidebar />
      {/* Main content */}
      <motion.main
        className="flex-1 p-7"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <motion.h1
          className="text-3xl font-bold mb-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Welcome back, <span className="capitalize text-indigo-800">{username}</span>
        </motion.h1>
        <motion.section
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.15 },
            },
          }}
        >
          <h2 className="text-2xl font-semibold mb-4">Start Donating!</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {donationOptions.map((option, idx) => {
              const isExpanded = expandedIdx === idx;
              const shortDesc = option.description.length > 70 ? option.description.slice(0, 70) + "..." : option.description;
              return (
                <motion.div
                  key={option.title}
                  className="bg-purple-50 p-5 w-30 rounded-2xl shadow-md transition-all duration-500 cursor-pointer border-2 border-transparent hover:border-purple-400 hover:shadow-2xl flex flex-col h-full justify-between"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + idx * 0.1, duration: 0.6 }}
                  whileHover={{ scale: 1.08, boxShadow: '0 8px 32px rgba(128,0,128,0.18)' }}
                >
                  <div className="-mt-2">
                    <motion.img
                      className="w-24 h-16 mb-2 object-contain"
                      src={option.logo}
                      alt={option.title + " logo"}
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.12 }}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.h3
                      className="text-sm font-semibold -mt-1 mb-2"
                      initial={{ color: '#4B0082' }}
                      whileHover={{ color: '#7C3AED' }}
                      transition={{ duration: 0.3 }}
                    >
                      {option.title}
                    </motion.h3>
                    <motion.p
                      className="text-[11px] ml-0.5 text-gray-600 leading-tight -mt-1"
                      initial={{ opacity: 1 }}
                      whileHover={{ opacity: 0.85 }}
                      transition={{ duration: 0.3 }}
                    >
                      {isExpanded ? option.description : shortDesc}
                      {option.description.length > 70 && (
                        <span
                          className="text-gray-400 ml-1 cursor-pointer text-xs underline"
                          onClick={() => setExpandedIdx(isExpanded ? null : idx)}
                        >
                          {isExpanded ? "Read Less" : "Read More"}
                        </span>
                      )}
                    </motion.p>
                  </div>
                  <motion.button
                    className="text-xs mt-5 px-2 py-1 transition-colors bg-purple-600 text-white rounded-lg hover:bg-purple-700 shadow-md"
                    whileHover={{ scale: 1.13 }}
                    onClick={() => {
                      router.push(`/pages/user/start-donation#${option.title}`);
                    }}
                  >
                    Support Now
                  </motion.button>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Summary */}
        <motion.section
          className="mt-9"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          <h2 className="text-2xl font-semibold mb-4">Your Donation Summary</h2>
          <div className="bg-purple-50 p-4 rounded-xl shadow-md text-gray-600">
            <p>
              Total Donated: <span className="font-semibold">₹{(totalDonated / 100).toFixed(2)}</span>
            </p>
            <p>
              Recent Donations: <span className="font-semibold">
                {lastTransaction
                  ? `₹${(lastTransaction.amount / 100).toFixed(2)} on ${format(
                      Date(lastTransaction.created_at * 1000),
                      "dd MMM yyyy"
                    )} was ${
                      lastTransaction.status === "captured"
                        ? "successful"
                        : "failed"
                    }`
                  : "no transactions yet!"}
              </span>
            </p>
          </div>
        </motion.section>

        <motion.section
          className="mt-5"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
        >
          <h2 className="text-2xl font-semibold mb-4">Recent Logins</h2>
          <div className="bg-purple-50 p-4 rounded-xl shadow-md text-gray-600">
            <p>
              Last Login: <span className="font-semibold">{lastlogin ? lastlogin : "first login"}</span>
            </p>
          </div>
        </motion.section>
      </motion.main>
    </div>
  );
}
