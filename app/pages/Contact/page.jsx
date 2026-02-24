import Header from "../../components/Header";
import React from "react";
import { FaEnvelope, FaPhoneSquareAlt } from "react-icons/fa";

function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-800 to-purple-700">
      <Header />
      <div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.0208894866314!2d77.33788287495777!3d28.659093182875022!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfa9b30000001%3A0xf8c8e01b5759ffb0!2sInderprastha%20Engineering%20College!5e0!3m2!1sen!2sin!4v1740637940272!5m2!1sen!2sin"
          className="w-full h-60 rounded-b-xl border-none shadow-lg"
          allowFullScreen
          loading="lazy"
          title="Albatroz Location"
        ></iframe>
      </div>
      <div className="text-white px-6 py-12">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center">
            <h1 className="text-5xl font-extrabold mb-4">Contact Us</h1>
            <p className="text-lg text-indigo-200">
              We'd love to hear from you — reach out with any questions or
              ideas!
            </p>
          </div>

          {/* Map + Info Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            {/* Address & Socials */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Our Address</h2>
                <p className="text-indigo-100 ml-1">
                  Inderprastha Engineering College
                  <br />
                  Site IV, Industrial Area, Sahibabad, Ghaziabad, Uttar Pradesh,
                  India.
                  <br />
                  PIN: 201010
                </p>
              </div>
            </div>
            {/* Social Buttons */}
            <div>
              <h2 className="text-2xl font-bold mb-2">Connect With Us</h2>
              <div className="flex gap-5 text-2xl text-white">
                <a
                  href="mailto:2103013071@ipec.org.in"
                  className="hover:text-indigo-300 ml-1"
                  title="Email"
                >
                  <FaEnvelope />
                </a>
                <a
                  href="tel:+917383197452"
                  className="hover:text-indigo-300 ml-1"
                  title="Email"
                >
                  <FaPhoneSquareAlt />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
