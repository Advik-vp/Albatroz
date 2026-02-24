"use client";
import React, { useState } from "react";
import Sidebar from "../../../components/Sidebar";
import DonationCard from "../../../components/DonationCard";
import PaymentModal from "../../../components/PopupModal";
import { BiSolidDonateHeart } from "react-icons/bi";

const donations = [
  {
    ngoName: "Smile Foundation",
    description:
      "Smile Foundation is a national-level development organization directly benefiting over 1.5 million children and families every year. It operates more than 400 welfare projects across India focusing on education, health, and skill development.",
    mission:
      "To empower underprivileged children, youth, and women through access to education, healthcare, and livelihood opportunities.",
    focusAreas: [
      "Education",
      "Healthcare",
      "Women Empowerment",
      "Livelihood",
      "Nutrition",
    ],
    programs: ["Mission Education", "Smile on Wheels", "Swabhiman"],
    website: "https://www.smilefoundationindia.org",
    logo: "https://www.smilefoundationindia.org/wp-content/uploads/2024/07/SMILE-FOUNDATION-LOGO-e1662456150120-1-300x235.png",
  },
  {
    ngoName: "Goonj",
    description:
      "Goonj is an award-winning NGO working across India to bridge the gap between urban excess and rural scarcity. It mobilizes unused urban goods as resources for triggering rural development and ensures dignity in giving.",
    mission:
      "To address basic but neglected needs like clothing, menstrual hygiene, and rural development using urban surplus as a tool for dignity-driven development.",
    focusAreas: [
      "Disaster Relief",
      "Rural Development",
      "Urban Waste Utilization",
      "Menstrual Health",
      "Community Engagement",
    ],
    programs: ["Cloth for Work", "Not Just a Piece of Cloth", "Rahat"],
    website: "https://goonj.org",
    logo: "https://goonj.org/wp-content/uploads/2020/06/Goonj-logo-10June20.png",
  },
  {
    ngoName: "Akshaya Patra",
    description:
      "The Akshaya Patra Foundation is a not-for-profit organization that runs the world’s largest school meal program, feeding over 2 million children every day.",
    mission:
      "To ensure that no child in India is deprived of education due to hunger.",
    focusAreas: [
      "Child Nutrition",
      "Mid-Day Meals",
      "Education Support",
      "School Infrastructure",
    ],
    programs: ["Mid-Day Meal Program", "Beyond Meals", "Kitchen Innovation"],
    website: "https://www.akshayapatra.org",
    logo: "https://www.akshayapatra.org/includefiles/settings/logo1.png",
  },
  {
    ngoName: "GiveIndia",
    description:
      "GiveIndia is India’s most trusted donation platform connecting donors with verified NGOs across sectors like education, healthcare, livelihoods, and disaster relief.",
    mission:
      "To alleviate poverty by enabling the world to give more effectively and transparently.",
    focusAreas: [
      "Fundraising",
      "Transparency in Giving",
      "Disaster Relief",
      "NGO Support",
      "Social Causes",
    ],
    programs: [
      "India COVID Response Fund",
      "Monthly Giving",
      "Corporate Giving",
    ],
    website: "https://www.giveindia.org",
    logo: "https://cfstatic.give.do/4a8e5f5d-659d-4558-8ae9-378ec1e92b1b.webp",
  },
];

export default function StartDonationPage() {
  const [selectedNGO, setSelectedNGO] = useState(null);

  const handleConfirmPayment = (amount) => {
    alert(`Donated ₹${amount} to ${selectedNGO}`);
    setSelectedNGO(null);
    // Add payment API or logic here
  };
  return (
    <div className="flex min-h-screen bg-purple-100 text-gray-900">
      <Sidebar />
      <main className="min-h-screen flex flex-wrap flex-col w-[1250px] p-7">
        <h1 className="text-3xl font-bold mb-4 flex flex-row items-center">
          Start a <span className="text-indigo-800 ml-2">Donation</span>.
          Support a Cause!
          <BiSolidDonateHeart className="ml-2 text-4xl text-indigo-800" />
        </h1>
        <p className="text-gray-700 mb-4">
          Here you can choose causes and enter donation details.
        </p>
        <hr className="border-2 border-purple-200 rounded mb-7" />

        <div className="space-y-6 p-4 scroll-smooth scroll-pt-5 overflow-x-auto max-w-[500vw] overflow-y-scroll rounded-2xl border-2 border-purple-200 max-h-[33vw] custom-scrollbar">
          {donations.map((donation, index) => (
            <DonationCard
              key={index}
              id={donation.ngoName}
              ngoName={donation.ngoName}
              description={donation.description}
              mission={donation.mission}
              focusAreas={donation.focusAreas}
              programs={donation.programs}
              website={donation.website}
              logo={donation.logo}
              onPay={() => setSelectedNGO(donation.ngoName)}
            />
          ))}
        </div>

        <PaymentModal
          isOpen={selectedNGO !== null}
          onClose={() => setSelectedNGO(null)}
          onConfirm={handleConfirmPayment}
          ngoName={selectedNGO}
        />

        {/* Add your donation form or flow here */}
      </main>
    </div>
  );
}
