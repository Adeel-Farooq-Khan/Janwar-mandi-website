import AppDownload from "@/components/AppDownload";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

function TermsAndConditions() {
  return (
    <>
      <Navbar />
      <section
        className="relative bg-cover bg-center flex justify-center items-center w-full h-[500px] px-10 pt-8"
        style={{
          backgroundImage:
            "linear-gradient(to left, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.5) 20%, rgba(0,0,0,0.2) 30%, rgba(0,0,0,0.2) 70%, rgba(0,0,0,0.5) 80%, rgba(0,0,0,0.5) 100%), url('/terms.webp')",
        }}
      >
        <div className="text-white text-center">
          <h1 className="text-[60px] font-bold">
            <span className="text-yellow-400">Terms & </span> Conditions
          </h1>
        </div>
      </section>

      <section className="flex flex-col items-center justify-center w-[90%] max-w-[900px] mx-auto my-10 px-5">
        <h1 className="text-[28px] text-gray-700 mb-2 text-center welcome-heading font-semibold">Terms and Conditions for Janwar Mandi</h1>
        <p className="text-[16px] leading-relaxed text-black text-center mb-6">
          Last Updated: April 15, 2025
        </p>

        <h2 className="text-[22px] text-gray-700 mb-2 text-left w-full font-semibold">Introduction</h2>
        <p className="text-[16px] leading-relaxed text-black mb-4">
          These Terms and Conditions (&quot;Terms&quot;) govern your access to and use of Janwar Mandi&apos;s website and mobile application (collectively, the &quot;Platform&quot;). By accessing or using our Platform, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our Platform.
        </p>

        <h2 className="text-[22px] text-gray-700 mb-2 text-left w-full font-semibold">Account Registration</h2>
        <p className="text-[16px] leading-relaxed text-black mb-4">
          To use certain features of our Platform, you may be required to register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete. You are responsible for safeguarding your password and for all activities that occur under your account.
        </p>
        <p className="text-[16px] leading-relaxed text-black mb-4">
          Janwar Mandi reserves the right to disable any user account if we believe you have violated any provisions of these Terms or if your account has been inactive for an extended period.
        </p>

        <h2 className="text-[22px] text-gray-700 mb-2 text-left w-full font-semibold">User Responsibilities</h2>
        <p className="text-[16px] leading-relaxed text-black mb-4">
          When using our Platform, you agree to:
        </p>
        <ul className="list-disc pl-8 mb-4 text-[16px] leading-relaxed text-black">
          <li>Provide accurate and truthful information about yourself and any livestock or products you list for sale</li>
          <li>Ensure all animals listed comply with local health and vaccination requirements</li>
          <li>Not engage in fraudulent activities or misrepresent the condition, health, or characteristics of listed animals</li>
          <li>Communicate respectfully with other users</li>
          <li>Complete transactions as agreed upon with other users</li>
          <li>Comply with all applicable laws and regulations</li>
        </ul>

        <h2 className="text-[22px] text-gray-700 mb-2 text-left w-full font-semibold">Listings and Transactions</h2>
        <p className="text-[16px] leading-relaxed text-black mb-4">
          Janwar Mandi serves as a platform connecting buyers and sellers of livestock and farm accessories. We do not own, sell, or resell any animals or products, nor are we a party to transactions between users.
        </p>
        <p className="text-[16px] leading-relaxed text-black mb-4">
          When listing animals or products, sellers must:
        </p>
        <ul className="list-disc pl-8 mb-4 text-[16px] leading-relaxed text-black">
          <li>Provide clear, accurate descriptions and images</li>
          <li>Set fair and transparent prices</li>
          <li>Respond promptly to inquiries from potential buyers</li>
          <li>Honor commitments made to buyers</li>
        </ul>
        <p className="text-[16px] leading-relaxed text-black mb-4">
          Buyers are responsible for:
        </p>
        <ul className="list-disc pl-8 mb-4 text-[16px] leading-relaxed text-black">
          <li>Verifying the condition and health of animals before completing purchases</li>
          <li>Making payments as agreed with sellers</li>
          <li>Arranging for transportation of purchased animals</li>
        </ul>

        <h2 className="text-[22px] text-gray-700 mb-2 text-left w-full font-semibold">Prohibited Activities</h2>
        <p className="text-[16px] leading-relaxed text-black mb-4">
          You may not use our Platform to:
        </p>
        <ul className="list-disc pl-8 mb-4 text-[16px] leading-relaxed text-black">
          <li>List or sell illegal or protected species</li>
          <li>List or sell sick, injured, or mistreated animals</li>
          <li>Post false, misleading, or deceptive content</li>
          <li>Harass, threaten, or defraud other users</li>
          <li>Interfere with the proper functioning of the Platform</li>
          <li>Collect user information without consent</li>
          <li>Violate any applicable laws or regulations</li>
        </ul>

        <h2 className="text-[22px] text-gray-700 mb-2 text-left w-full font-semibold">Limitation of Liability</h2>
        <p className="text-[16px] leading-relaxed text-black mb-4">
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, JANWAR MANDI SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM:
        </p>
        <ul className="list-disc pl-8 mb-4 text-[16px] leading-relaxed text-black">
          <li>YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE PLATFORM</li>
          <li>ANY CONDUCT OR CONTENT OF ANY THIRD PARTY ON THE PLATFORM</li>
          <li>ANY CONTENT OBTAINED FROM THE PLATFORM</li>
          <li>UNAUTHORIZED ACCESS, USE, OR ALTERATION OF YOUR TRANSMISSIONS OR CONTENT</li>
        </ul>

        <h2 className="text-[22px] text-gray-700 mb-2 text-left w-full font-semibold">Dispute Resolution</h2>
        <p className="text-[16px] leading-relaxed text-black mb-4">
          Any disputes arising from or relating to these Terms or your use of the Platform shall be resolved through negotiation in good faith. If the dispute cannot be resolved through negotiation, it shall be submitted to binding arbitration in accordance with the laws of Pakistan.
        </p>

        <h2 className="text-[22px] text-gray-700 mb-2 text-left w-full font-semibold">Modifications to Terms</h2>
        <p className="text-[16px] leading-relaxed text-black mb-4">
          We may revise these Terms from time to time. The most current version will always be posted on our Platform. By continuing to access or use our Platform after revisions become effective, you agree to be bound by the revised Terms.
        </p>

        <h2 className="text-[22px] text-gray-700 mb-2 text-left w-full font-semibold">Contact Us</h2>
        <p className="text-[16px] leading-relaxed text-black mb-4">
          If you have any questions about these Terms, please contact us at:
        </p>
        <p className="text-[16px] leading-relaxed text-black mb-8 font-semibold">
          Email: legal@janwarmandi.com<br />
          Phone: +92-123-456-7890<br />
          Address: Office #123, Business Plaza, Gulberg III, Lahore, Pakistan
        </p>
      </section>

      <section className="flex flex-col items-center justify-center w-[90%] max-w-[1300px] mx-auto my-10 px-5 shadow-md shadow-black/10 p-5">
        <h1 className="text-[36px] font-extrabold text-gray-700 mb-2 text-center">
          <span className="text-yellow-400">
            <span className="text-green-700">Legal </span>Compliance
          </span>
        </h1>
        <p className="text-[16px] leading-relaxed text-black text-center mb-4 px-10 md:px-5 sm:px-2">
          At Janwar Mandi, we are committed to operating with integrity and in full compliance with all applicable laws and regulations. Our platform is designed to facilitate legitimate transactions between buyers and sellers while ensuring animal welfare standards are maintained. We advise all users to familiarize themselves with relevant livestock trade regulations in Pakistan and to conduct all transactions responsibly.
        </p>
      </section>

      <AppDownload />
      <Footer />
    </>
  );
}

export default TermsAndConditions;