import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
const charities = [
  {
    name: "Smile Foundation",
    description:
      "Empowering children and women through education and healthcare.",
    image:
      "https://www.smilefoundationindia.org/wp-content/uploads/2024/07/SMILE-FOUNDATION-LOGO-e1662456150120-1-300x235.png",
    website: "https://www.smilefoundationindia.org",
  },
  {
    name: "Goonj",
    description:
      "Turning urban waste into development resources for rural India.",
    image:
      "https://goonj.org/wp-content/uploads/2020/06/Goonj-logo-10June20.png",
    website: "https://goonj.org",
  },
  {
    name: "Akshaya Patra",
    description:
      "Running the world’s largest NGO school meal program in India.",
    image: "https://www.akshayapatra.org/includefiles/settings/logo1.png",
    website: "https://www.akshayapatra.org",
  },
  {
    name: "GiveIndia",
    description: "A trusted donation platform supporting verified Indian NGOs.",
    image: "https://cfstatic.give.do/4a8e5f5d-659d-4558-8ae9-378ec1e92b1b.webp",
    website: "https://www.giveindia.org",
  },
];
function Charity() {
  return (
    <>
      <Header />
      <div className="flex justify-center bg-gray-50 items-center">
        <main className="max-w-5xl mx-auto px-4 py-10 text-gray-800">
          {/* Charity Grid */}
          <section className="mb-10">
            <h2 className="text-3xl font-bold text-indigo-700 mb-8 text-center">
              Featured Charities
            </h2>
            <div className="grid gap-6  sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {charities.map(
                ({ name, description, image, website, mission }) => (
                  <a
                    key={name}
                    href={website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white border border-gray-200 rounded-2xl shadow hover:shadow-lg transition p-5 flex flex-col items-center text-center"
                  >
                    <img
                      src={image}
                      alt={`${name} logo`}
                      className="w-20 h-20 object-contain mb-4"
                    />
                    <h3 className="text-lg font-semibold text-gray-900">
                      {name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">{mission}</p>
                    <p className="text-xs text-gray-500 mt-2">{description}</p>
                  </a>
                )
              )}
            </div>
          </section>

          {/* Project Overview */}
          <section className="mb-10 max-w-5xl mx-auto grid gap-10 md:grid-cols-2">
            {/* About DaanMitra */}
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
              <h2 className="text-2xl font-bold text-indigo-700 mb-4">
                  About Albatroz Secure Pay
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                  <strong>Albatroz Secure Pay</strong> is a transparent, blockchain-backed
                platform that makes donating to verified Indian charities
                simple, secure, and impactful. Whether you prefer UPI or
                cryptocurrency, your donations reach trusted non-profits that
                bring real change.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We partner only with NGOs that meet strict verification criteria
                and provide full accountability. Our platform enables you to
                track your donations and see their real-world impact.
              </p>
            </div>

            {/* Mission */}
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
              <h2 className="text-2xl font-bold text-indigo-700 mb-4">
                Our Mission
              </h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2 leading-relaxed">
                <li>Bridge the gap between donors and impactful causes.</li>
                <li>
                  Enable giving through technology, transparency, and trust.
                </li>
                <li>Only partner with verified, accountable charities.</li>
                <li>Provide donation tracking and real-time impact reports.</li>
              </ul>
            </div>

            {/* How It Works */}
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200 md:col-span-2">
              <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">
                How It Works
              </h2>
              <ol className="list-decimal list-inside space-y-4 text-gray-700 max-w-3xl mx-auto leading-relaxed">
                <li>
                  <strong>Browse Causes:</strong> Explore verified charities
                  categorized by sectors like Education, Healthcare,
                  Environment, Disaster Relief, and more.
                </li>
                <li>
                  <strong>Choose a Charity:</strong> View detailed profiles
                  including verified credentials, goals, and impact stories.
                </li>
                <li>
                  <strong>Select Amount & Payment Method:</strong> Enter your
                  donation amount and pay using UPI or crypto via Cryptomus.
                </li>
                <li>
                  <strong>Track Donation:</strong> Real-time updates for crypto
                  and UPI payment confirmation.
                </li>
                <li>
                  <strong>See the Impact:</strong> Access receipts, public
                  ledger, and impact updates.
                </li>
              </ol>
            </div>
          </section>

          {/* Contact CTA */}
          <section className="bg-indigo-50 mt-10 p-6 shadow-md rounded-xl max-w-6xl ">
            <h2 className="text-xl font-semibold text-indigo-800 mb-2">
              Want to List Your Charity ?
            </h2>
            <p className="text-gray-700 mb-4  ">
              If you represent a verified NGO or non-profit and want to join
                Albatroz Secure Pay's platform, please contact us with your NGO and cause
              details.
            </p>
            <a
              href="mailto:2103013071@ipec.org.in"
              className="inline-block px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
            >
              Contact Us
            </a>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}

export default Charity;
