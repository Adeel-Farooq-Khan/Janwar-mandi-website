import AppDownload from "@/components/AppDownload";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

function PrivacyPolicy() {
  return (
    <>
      <Navbar />
      <section
        className="relative bg-cover bg-center flex justify-center items-center w-full h-[500px] px-10 pt-8"
        style={{
          backgroundImage:
            `linear-gradient(to left, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.5) 20%, rgba(0,0,0,0.2) 30%, rgba(0,0,0,0.2) 70%, rgba(0,0,0,0.5) 80%, rgba(0,0,0,0.5) 100%), url('/privacypolicy.jpg')`,
        }}
      >
        <div className="text-white text-center">
          <h1 className="text-[60px] font-bold">
            <span className="text-yellow-400">Privacy </span> Policy
          </h1>
        </div>
      </section>

      <section className="flex flex-col items-center justify-center w-[90%] max-w-[900px] mx-auto my-10 px-5">
        <h1 className="text-[28px] text-gray-700 mb-2 text-center welcome-heading font-semibold">Privacy Policy for Janwar Mandi</h1>
        <p className="text-[16px] leading-relaxed text-black text-center mb-6">
          Last Updated: April 15, 2025
        </p>
        
        <h2 className="text-[22px] text-gray-700 mb-2 text-left w-full font-semibold">Introduction</h2>
        <p className="text-[16px] leading-relaxed text-black mb-4">
          At Janwar Mandi, we respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our mobile application to buy or sell livestock and farm accessories in Pakistan.
        </p>

        <h2 className="text-[22px] text-gray-700 mb-2 text-left w-full font-semibold">Information We Collect</h2>
        <p className="text-[16px] leading-relaxed text-black mb-4">
          We collect information that you provide directly to us when you register for an account, create or modify your profile, make purchases, or communicate with us. This information may include your name, email address, phone number, address, payment information, and any other information you choose to provide.
        </p>
        <p className="text-[16px] leading-relaxed text-black mb-4">
          We also automatically collect certain information when you use our platform, including your IP address, device information, browser type, referring/exit pages, and operating system. We may use cookies and similar tracking technologies to track activity on our platform and hold certain information.
        </p>

        <h2 className="text-[22px] text-gray-700 mb-2 text-left w-full font-semibold">How We Use Your Information</h2>
        <p className="text-[16px] leading-relaxed text-black mb-4">
          We use the information we collect to:
        </p>
        <ul className="list-disc pl-8 mb-4 text-[16px] leading-relaxed text-black">
          <li>Facilitate transactions between buyers and sellers</li>
          <li>Provide, maintain, and improve our services</li>
          <li>Process your transactions and send related information</li>
          <li>Send administrative messages, updates, and security alerts</li>
          <li>Respond to your comments, questions, and customer service requests</li>
          <li>Personalize your experience and deliver content relevant to your interests</li>
          <li>Monitor and analyze trends, usage, and activities in connection with our services</li>
        </ul>

        <h2 className="text-[22px] text-gray-700 mb-2 text-left w-full font-semibold">Sharing Your Information</h2>
        <p className="text-[16px] leading-relaxed text-black mb-4">
          We may share the information we collect in various ways, including:
        </p>
        <ul className="list-disc pl-8 mb-4 text-[16px] leading-relaxed text-black">
          <li>With other users as needed to facilitate transactions (e.g., sharing contact information between buyers and sellers)</li>
          <li>With vendors, consultants, and service providers who need access to such information to perform services on our behalf</li>
          <li>In response to a request for information if we believe disclosure is in accordance with, or required by, any applicable law or legal process</li>
          <li>If we believe your actions are inconsistent with our user agreements or policies, or to protect the rights, property, and safety of Janwar Mandi or others</li>
        </ul>

        <h2 className="text-[22px] text-gray-700 mb-2 text-left w-full font-semibold">Data Security</h2>
        <p className="text-[16px] leading-relaxed text-black mb-4">
          We take reasonable measures to help protect information about you from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction. However, no internet or electronic communications service is ever completely secure or error-free.
        </p>

        <h2 className="text-[22px] text-gray-700 mb-2 text-left w-full font-semibold">Your Rights</h2>
        <p className="text-[16px] leading-relaxed text-black mb-4">
          You may update, correct, or delete your account information at any time by logging into your account or contacting us. You may also request access to the personal data we hold about you and request that we correct any inaccuracies or delete your personal data (where we do not have an obligation to retain it).
        </p>

        <h2 className="text-[22px] text-gray-700 mb-2 text-left w-full font-semibold">Changes to This Privacy Policy</h2>
        <p className="text-[16px] leading-relaxed text-black mb-4">
          We may change this Privacy Policy from time to time. If we make changes, we will notify you by revising the date at the top of the policy and, in some cases, we may provide you with additional notice (such as adding a statement to our homepage or sending you a notification).
        </p>

        <h2 className="text-[22px] text-gray-700 mb-2 text-left w-full font-semibold">Contact Us</h2>
        <p className="text-[16px] leading-relaxed text-black mb-4">
          If you have any questions about this Privacy Policy, please contact us at:
        </p>
        <p className="text-[16px] leading-relaxed text-black mb-8 font-semibold">
          Email: privacy@janwarmandi.com<br />
          Phone: +92-123-456-7890<br />
          Address: Office #123, Business Plaza, Gulberg III, Lahore, Pakistan
        </p>
      </section>

      <AppDownload />
      <Footer />
    </>
  );
}

export default PrivacyPolicy;