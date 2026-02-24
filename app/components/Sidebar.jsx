"use client";
import { logoutUser } from "../../utils/api";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { TbLogout2 } from "react-icons/tb";
import { TbLayoutDashboard } from "react-icons/tb";
import { MdOutlinePayments, MdHistory, MdOutlineSwitchAccount } from "react-icons/md";
import { motion } from "framer-motion";

const navLinks = [
  {
    label: "Dashboard",
    href: "/pages/user/dashboard",
    icon: <TbLayoutDashboard className="text-2xl" />,
  },
  {
    label: "Start Donation",
    href: "/pages/user/start-donation",
    icon: <MdOutlinePayments className="text-2xl" />,
  },
  {
    label: "Donation History",
    href: "/pages/user/donation-history",
    icon: <MdHistory className="text-2xl" />,
  },
  {
    label: "My Profile",
    href: "/pages/user/profile",
    icon: <MdOutlineSwitchAccount className="text-2xl" />,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const isActive = (href) => pathname == href;
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const res = await logoutUser();
      if (res.success) {
        localStorage.clear();
        router.push("/");
      } else if (res.error) {
        Error(res.message);
      }
    } catch (err) {
      Error("Logout error:", err);
    }
  };

  return (
    <motion.aside
      className="w-64 bg-blue-950 text-white p-6 space-y-8 flex flex-col justify-between min-h-screen"
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7 }}
    >
      <div>
        <motion.div
          className="text-3xl text-purple-100 font-bold"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Albatroz
        </motion.div>
        <nav className="flex flex-col gap-4 mt-8">
          {navLinks.map((link, idx) => (
            <motion.div key={link.href} whileHover={{ scale: 1.07 }}>
              <Link
                href={link.href}
                className={`px-3 py-2 rounded-lg flex flex-row items-center justify-between transition-colors ${
                  isActive(link.href)
                    ? "bg-purple-100 text-purple-950 font-semibold "
                    : "hover:bg-blue-900"
                }`}
              >
                {link.label}
                {link.icon}
              </Link>
            </motion.div>
          ))}
        </nav>
      </div>
      {/* Bottom logo and logout button */}
      <div className="flex flex-row items-center justify-center gap-4 mt-8 mb-2">
        <img
          src="/user-male-circle.png"
          alt="User Logo"
          className="w-10 h-10 object-contain"
        />
        <motion.div className="flex" whileHover={{ scale: 1.05 }}>
          <button
            onClick={handleLogout}
            className="flex flex-row items-center font-semibold bg-indigo-700 hover:bg-indigo-600 text-purple-100 px-4 py-2 rounded-xl transition-all duration-900 ml-2"
          >
            <TbLogout2 className="text-xl mr-1" /> Logout
          </button>
        </motion.div>
      </div>
    </motion.aside>
  );
}
