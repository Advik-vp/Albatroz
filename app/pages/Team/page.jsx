"use client";
import React from "react";
import Image from "next/image";
import Header from "../../components/Header";
import aastha from "../../../public/aastha.jpg";
import adarsh from "../../../public/adarsh.jpg";
import aditya from "../../../public/aditya.jpg";
import advik from "../../../public/advik.jpg";

const teamMembers = [
  {
    name: "Aastha Jain",
    role: "Tester",
    image: aastha,
  },
  {
    name: "Adarsh Shukla",
    role: "FullStack Developer",
    image: adarsh,
  },
  {
    name: "Aditya Kumar",
    role: "FullStack Developer",
    image: aditya,
  },
  {
    name: "Advik Vivan",
    role: "Documentation expert",
    image: advik,
  },
];

function Team() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-800 to-purple-700">
      <Header />
      <div className="flex flex-col items-center py-16">
        <div className="max-w-6xl w-full px-6 text-center">
          <h1 className="text-5xl font-extrabold text-white drop-shadow-md mb-4">
            Meet the Team Behind Albatroz
          </h1>
          <p className="text-lg text-indigo-100 mb-12">
            Designers. Developers. Dreamers. We’re building a better way to
            give.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="relative bg-white/10 backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden p-6 group hover:scale-[1.03] hover:shadow-2xl transition duration-500"
              >
                <div className="relative z-10">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={128}
                    height={128}
                    className="w-28 h-28 mx-auto object-cover rounded-full border-4 border-purple-200 shadow-md transition-transform duration-300 group-hover:scale-110"
                  />
                  <h2 className="mt-5 text-xl font-semibold text-white">
                    {member.name}
                  </h2>
                  <p className="mt-1 inline-block px-3 py-1 text-sm rounded-xl bg-indigo-700 text-white bg-opacity-80">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {/* Call to Action */}
          <div className="mt-10">
            <h2 className="text-3xl text-white font-bold mb-4">
              Want to join our mission?
            </h2>
            <p className="text-indigo-100">
              We're always open to working with like-minded individuals who
              believe in giving back.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Team;
