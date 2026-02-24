"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiLogIn } from "react-icons/fi";
import { usePathname } from "next/navigation";

function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (href) => pathname === href;

  return (
    <motion.nav
      className="bg-white border-gray-200 py-2.5 dark:bg-blue-950 sticky top-0 z-50 shadow-md"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <motion.div
        className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        {/* Logo */}
        <motion.div whileHover={{ scale: 1.05 }}>
          <Link href="/" className="flex items-center">
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Albatroz
            </span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          {["Home", "Charity", "Team", "Contact"].map((name, index) => {
            const path = name === "Home" ? "/" : `/pages/${name}`;
            return (
              <motion.div key={index} whileHover={{ scale: 1.1 }}>
                <Link
                  href={path}
                  className={`text-base font-medium ${
                    isActive(path)
                      ? "text-blue-700 dark:text-white"
                      : "text-gray-700 hover:text-blue-700 dark:text-gray-400 dark:hover:text-white"
                  }`}
                >
                  {name}
                </Link>
              </motion.div>
            );
          })}
        </div>
        <div className="flex items-center lg:order-2 space-x-2">
          {/* Login Button */}
          <motion.div whileHover={{ scale: 1.08 }}>
            <Link
              href="/login"
              className="text-white flex justify-center items-center bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm mx-1 px-4 py-2 dark:bg-purple-700 dark:hover:bg-blue-700 transition-all duration-700"
            >
              Login
            </Link>
          </motion.div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-purple-400 rounded-lg lg:hidden hover:bg-purple-200 dark:hover:bg-blue-700"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                {/* Close (X) Icon */}
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                {/* Hamburger Icon */}
                <path
                  fillRule="evenodd"
                  d="M3 5h14a1 1 0 110 2H3a1 1 0 110-2zm0 5h14a1 1 0 110 2H3a1 1 0 110-2zm0 5h14a1 1 0 110 2H3a1 1 0 110-2z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
        </div>
      </motion.div>

      {/* Mobile Navigation Menu */}
      <motion.div
        className={`lg:hidden transition-all duration-500 ease-in-out ${isOpen ? "max-h-96 " : "max-h-0 "}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -20 }}
        transition={{ duration: 0.5 }}
      >
        <ul className={`flex flex-col p-4 bg-blue-50 dark:bg-blue-950 py-4 ${isOpen ? "visible" : "invisible"}`}>
          {["Home", "Charity", "Team", "Contact"].map((name, index) => {
            const path = name === "Home" ? "/" : `/pages/${name}`;
            return (
              <motion.li key={index} whileHover={{ scale: 1.08 }}>
                <Link
                  href={path}
                  onClick={() => setIsOpen(false)}
                  className={`block py-2 px-2 rounded-md text-lg font-medium ${
                    isActive(path)
                      ? "text-blue-700 dark:text-white bg-purple-700"
                      : "text-gray-700 hover:text-blue-700 dark:text-gray-400 dark:hover:text-white"
                  }`}
                >
                  {name}
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </motion.div>
    </motion.nav>
  );
}

export default Header;
