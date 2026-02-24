import React, { useEffect, useState } from "react";
import RazorpayBtn from "./RazorpayBtn";
import CryptomusBtn from "./CryptomusBtn";
import { IoCloseCircle } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

const PaymentModal = ({ isOpen, onClose, onConfirm, ngoName }) => {
  const [amount, setAmount] = useState("");
  const [disabled, setDisabled] = useState(true);
  useEffect(() => {
    setDisabled(amount < 1);
  }, [amount]);
  const handleClose = () => {
    setAmount("");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-blue-950 bg-opacity-80 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="bg-white p-5 rounded-2xl w-full max-w-md shadow-xl"
            initial={{ scale: 0.8, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 40 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex flex-row-reverse justify-between items-start  relative">
              <motion.button
                onClick={handleClose}
                className=" text-3xl  text-indigo-900 rounded-full hover:text-red-900 transition-all duration-300"
                whileHover={{ scale: 1.2 }}
              >
                <IoCloseCircle />
              </motion.button>
              <h2 className="text-2xl font-bold mb-4 text-blue-700">
                Donate to {ngoName}
              </h2>
            </div>

            <p className="text-gray-700 text-sm mb-4">
              Your contribution can make a huge difference!
            </p>
            <input
              type="number"
              placeholder="Enter amount you wish to donate"
              min="1"
              value={amount}
              required
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-2 border-2 border-blue-800 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
            <div className="flex justify-end space-x-3">
              <CryptomusBtn
                onClick={() => {
                  onConfirm(amount);
                  setAmount("");
                }}
                amount={amount}
                disabled={disabled}
              />
              <RazorpayBtn
                onClick={() => {
                  onConfirm(amount);
                  setAmount("");
                }}
                amount={amount}
                disabled={disabled}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PaymentModal;
