"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { MdPrivacyTip } from "react-icons/md";

function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <motion.div
        className="w-full flex-col px-6 pt-20 lg:flex lg:px-10 xl:px-24"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <div className="text-zinc-600 cursor-default lg:flex lg:flex-row lg:gap-x-16">
          <motion.div whileHover={{ scale: 1.03 }}>
            <h2 className="text-2xl text-zinc-800 font-mono font-bold">Albatroz</h2>
            <ul className="mt-4 text-sm flex flex-col items-start justify-start gap-2">
              <li className="flex flex-row items-start">
                {/* ...existing code... */}
                <span>
                  {/* SVG icon */}
                </span>
                <p className="font-inter">IPEC</p>
              </li>
              <li className="flex flex-row items-start">
                <span>
                  {/* SVG icon */}
                </span>
                <p className="font-inter">Delhi-NCR</p>
              </li>
            </ul>
          </motion.div>
          <div className="mt-4 md:mt-0 lg:mt-0 flex flex-row flex-wrap lg:flex-nowrap lg:justify-center gap-4 lg:gap-x-24">
            <motion.div whileHover={{ scale: 1.03 }}>
                <h2 className="font-mono font-bold text-zinc-700 text-lg">
                  Albatroz Team
                </h2>
                <ul className="mt-4 grid gap-2 ">
                  <li className="flex items-start text-sm">
                    <span>{/* SVG icon */}</span>
                    <a
                      className="text-left text-zinc-600 break-words hover:underline hover:text-zinc-800"
                      href="mailto:adityakumar10128@gmail.com"
                    >
                      adityakumar10128@gmail.com
                    </a>
                  </li>
                  <li className="flex items-start text-sm">
                    <span>{/* SVG icon */}</span>
                    <a
                      className="text-left text-zinc-600 break-words hover:underline hover:text-zinc-800"
                      href="mailto:adarsh1520shukla@gmail.com"
                    >
                      adarsh1520shukla@gmail.com
                    </a>
                  </li>
                  <li className="flex items-start text-sm">
                    <span>{/* SVG icon */}</span>
                    <a
                      className="text-left text-zinc-600 break-words hover:underline hover:text-zinc-800"
                      href="mailto:jainaastha310@gmail.com"
                    >
                      jainaastha310@gmail.com
                    </a>
                  </li>
                  <li className="flex items-start text-sm">
                    <span>{/* SVG icon */}</span>
                    <a
                      className="text-left text-zinc-600 break-words hover:underline hover:text-zinc-800"
                      href="mailto:advikvivan72@gmail.com"
                    >
                      advikvivan72@gmail.com
                    </a>
                  </li>
                </ul>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }}>
              <h2 className="font-mono font-bold text-zinc-700 text-lg">Legal</h2>
              <ul className="mt-4 grid gap-2">
                <li className="flex justify-center items-center text-sm">
                  {/* ...existing code... */}
                  <MdPrivacyTip />
                  <Link
                    href="/pages/legal"
                    className=" hover:underline ml-1 text-zinc-700"
                  >
                    Privacy Policy & Terms of Use
                  </Link>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
        <motion.div
          className="w-full mt-10 py-10 border-t border-zinc-200 font-inter text-center text-xs text-zinc-400"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Copyright © 2025 Albatroz All rights reserved.
        </motion.div>
      </motion.div>
    </motion.footer>
  );
}

export default Footer;
