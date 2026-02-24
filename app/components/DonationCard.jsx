import React from "react";

const DonationCard = ({
  id,
  ngoName,
  description,
  mission,
  focusAreas,
  programs,
  website,
  logo,
  onPay,
}) => {
  return (
    <div
      className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-500 p-6 w-full  mx-auto"
      id={id}
    >
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
        {/* Logo */}
        <div className="w-full md:w-28 flex-shrink-0">
          <img
            src={logo}
            alt={`${ngoName} Logo`}
            className="w-24 h-24 object-contain rounded-lg border p-2 bg-gray-50"
          />
        </div>

        {/* Info */}
        <div className="flex-1">
          <div className="flex flex-row justify-start items-center mb-1">
            <h2 className="text-2xl font-bold text-indigo-700 ">{ngoName}</h2>
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block ml-4 text-sm font-medium text-blue-600 hover:text-blue-800 transition"
            >
              🌐 Visit Website
            </a>
          </div>
          <p className="text-sm text-gray-500 italic">{mission}</p>
          <p className="text-gray-700 text-[15px] mt-3 leading-relaxed">
            {description}
          </p>

          {/* Focus Areas & Programs */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <h4 className="text-sm font-semibold text-purple-700 mb-1">
                Focus Areas
              </h4>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                {focusAreas.map((area, index) => (
                  <li key={index}>{area}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-purple-700 mb-1">
                Programs
              </h4>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                {programs.map((program, index) => (
                  <li key={index}>{program}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Donate Button */}
        <div className="self-stretch md:self-center mt-6 flex justify-end w-full">
          <button
            onClick={onPay}
            className="px-5 py-2.5 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition-all duration-300 shadow-md"
          >
            Donate
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonationCard;
