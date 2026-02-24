"use client";
import Sidebar from "../../../components/Sidebar";
import { getPaymentHistory } from "../../../../utils/api";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { HiRefresh } from "react-icons/hi";

export default function DonationHistoryPage() {
  const [payments, setPayments] = useState([]);
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    const customerid = localStorage.getItem("customer_id");
    const email = localStorage.getItem("user-email");
    const fetchTransactionHistory = async () => {
      const res = await getPaymentHistory(customerid, email);
      if (res.success) {
        setPayments(res.data);
      } else {
        Error("Error fetching user details:", res.message);
      }
      setRefresh(true);
    };
    fetchTransactionHistory();
  }, [refresh]);

  return (
    <div className="flex min-h-screen bg-purple-100 text-gray-900">
      <Sidebar />
      <main className="min-h-screen w-[83vw] p-7">
        <h1 className="text-3xl font-bold mb-3">Donation History</h1>
        <span className="flex flex-row justify-between items-center mb-3">
          <p className="text-gray-700">Get all your past donations here.</p>
          <button
            className={`text-lg text-indigo-800 bg-purple-100 p-1.5 rounded-xl border-2 border-purple-300 shadow-md hover:bg-purple-200 active:shadow-sm transition-all  ${
              !refresh && "cursor-not-allowed"
            }`}
            onClick={() => {
              setRefresh(false);
            }}
          >
            <HiRefresh
              className={`transition-transform duration-2000 ${
                !refresh && "animate-spin -rotate-180"
              }`}
            />
          </button>
        </span>
        <hr className="mt-3 border-2 border-purple-200 rounded mb-8 " />
        {payments.status === 404 ? (
          <div className="text-center py-4">No donations yet!</div>
        ) : (
          <div>
            {refresh && payments.length > 0 ? (
              <div className="overflow-x-auto max-w-[200vw] overflow-y-scroll rounded-xl shadow-md max-h-[30vw] custom-scrollbar">
                <table className="w-full divide-y divide-gray-200 bg-purple-50  min-w-full table-auto">
                  <thead className="bg-gray-100 text-md text-indigo-800  w-full sticky top-0 z-10">
                    <tr>
                      <th className="px-4 py-2 text-left">Payment ID</th>
                      <th className="px-4 py-2 text-right">Amount (INR)</th>
                      <th className="px-4 py-2 text-center">Status</th>
                      <th className="px-4 py-2 text-center">Order ID</th>
                      <th className="px-4 py-2 text-center">Bank</th>
                      <th className="px-4 py-2 text-center">Method</th>
                      <th className="px-4 py-2 text-center">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
                    {payments.map((payment) => (
                      <tr
                        key={payment.id}
                        className={
                          payment.status === "failed" ? "bg-red-50" : ""
                        }
                      >
                        <td className="px-4 py-2 font-mono text-xs">
                          {payment.id}
                        </td>
                        <td className="px-4 py-2 text-right font-semibold">
                          {(payment.amount / 100).toFixed(2)}
                        </td>
                        <td className="px-4 py-4 text-center">
                          <span
                            className={`px-2 py-1 rounded text-xs font-bold ${
                              payment.status === "captured"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {payment.status === "captured"
                              ? "Success"
                              : "Failed"}
                          </span>
                        </td>
                        <td className="px-4 py-2 font-mono text-xs text-center">
                          {payment.order_id}
                        </td>
                        <td className="px-4 py-2 text-center">
                          {payment.bank}
                        </td>
                        <td className="px-4 py-2 text-center capitalize">
                          {payment.method}
                        </td>
                        <td className="px-4 py-2 text-center">
                          {format(
                            new Date(payment.created_at * 1000),
                            "dd MMM yyyy, hh:mm a"
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-4">Data Loading...</div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
