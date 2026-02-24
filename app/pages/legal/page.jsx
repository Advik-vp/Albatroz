"use client";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useRouter } from "next/navigation";

export default function Legal() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-white text-gray-800 px-6 py-16">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Title */}
        <IoMdArrowRoundBack
          className="text-xl cursor-pointer"
          onClick={() => router.push("/")}
        />
        <div className="text-center">
          <h1 className="text-4xl font-bold text-purple-700">
            Privacy Policy & Terms of Use
          </h1>
          <p className="mt-2 text-gray-600">Effective Date: March 12, 2025</p>
        </div>

        {/* PRIVACY POLICY */}
        <section>
          <h2 className="text-3xl font-semibold text-purple-600 mb-4">
            Privacy Policy
          </h2>
          <p>
            Albatroz Secure Pay ("we", "our", "us") is committed to protecting your
            personal information and your right to privacy. This section
            explains what data we collect and how we use it.
          </p>

          <h3 className="text-xl font-semibold mt-6">
            1. Information We Collect
          </h3>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>Personal data such as name, email, and contact number.</li>
            <li>
              Cryptocurrency transaction metadata (amount, timestamp, wallet
              ID).
            </li>
            <li>
              Site analytics including IP address, device info, and interaction
              data.
            </li>
          </ul>

          <h3 className="text-xl font-semibold mt-6">2. Use of Information</h3>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>To process crypto donations securely.</li>
            <li>
              To provide donor transparency and support charitable projects.
            </li>
            <li>
              To improve our platform and notify users about project updates.
            </li>
          </ul>

          <h3 className="text-xl font-semibold mt-6">3. Data Sharing</h3>
          <p>
            We do not sell your data. We may share information with trusted
            partners like payment processors or legal authorities when required
            by law.
          </p>

          <h3 className="text-xl font-semibold mt-6">4. Your Rights</h3>
          <p>
            You may request access, correction, or deletion of your data anytime
            by contacting <strong>2103013071@ipec.org.in</strong>.
          </p>

          <h3 className="text-xl font-semibold mt-6">5. Security</h3>
          <p>
            We use encryption, HTTPS, and secure storage to protect your data
            but cannot guarantee absolute security over the internet.
          </p>
        </section>

        <hr className="border-t border-gray-300" />

        {/* TERMS OF USE */}
        <section>
          <h2 className="text-3xl font-semibold text-purple-600 mb-4">
            Terms of Use
          </h2>
            <p>
              By using Albatroz, you agree to these terms. Please read them
              carefully before proceeding with donations or using our services.
            </p>

          <h3 className="text-xl font-semibold mt-6">1. Eligibility</h3>
          <p>
              You must be at least 18 years old or the legal age in your
              jurisdiction to use Albatroz’s services.
          </p>

          <h3 className="text-xl font-semibold mt-6">2. Use of the Platform</h3>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>You agree to use the platform lawfully and in good faith.</li>
            <li>You are responsible for any activity under your account.</li>
            <li>Crypto donations are final and cannot be reversed.</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6">3. Donations</h3>
          <p>
              Donations made through Albatroz are transferred directly to
              verified causes or charities. We do not guarantee any tax benefit
              unless explicitly mentioned by the receiving charity.
          </p>

          <h3 className="text-xl font-semibold mt-6">4. Prohibited Behavior</h3>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>No misuse of the donation system.</li>
            <li>
              No uploading of false, fraudulent, or misleading information.
            </li>
            <li>No interference with security features of the platform.</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6">
            5. Limitation of Liability
          </h3>
          <p>
              Albatroz shall not be liable for losses due to cryptocurrency
              volatility or misuse by third-party charities. Use the platform at
              your own risk.
          </p>

          <h3 className="text-xl font-semibold mt-6">6. Termination</h3>
          <p>
            We reserve the right to suspend or terminate access if terms are
            violated.
          </p>

          <h3 className="text-xl font-semibold mt-6">7. Updates</h3>
          <p>
            We may modify these terms from time to time. Continued use implies
            acceptance of the revised terms.
          </p>

          <h3 className="text-xl font-semibold mt-6">8. Contact</h3>
          <p>
            For legal inquiries or support, email us at{" "}
            <strong>2103013071@ipec.org.in</strong>.
          </p>
        </section>
      </div>
    </div>
  );
}
