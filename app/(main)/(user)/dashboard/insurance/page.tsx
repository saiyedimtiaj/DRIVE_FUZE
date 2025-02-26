import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className="space-y-12 mb-10">
      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row items-center justify-between bg-gray-50 p-4 md:p-8 rounded-lg shadow-md">
        <div className="space-y-4 max-w-lg">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">
            Submit Your Insurance Claim
          </h1>
          <p className="text-gray-600">
            Need to file a claim? Scan the QR code to begin. <br />
            You’ll be redirected to our FCA-regulated insurance partner:{" "}
            <strong>FLOCK</strong>.
          </p>
        </div>
        <div className="mt-6 lg:mt-0">
          <Image
            src="https://media.istockphoto.com/id/1347277582/vector/qr-code-sample-for-smartphone-scanning-on-white-background.jpg?s=612x612&w=0&k=20&c=6e6Xqb1Wne79bJsWpyyNuWfkrUgNhXR4_UYj3i_poc0="
            alt="QR Code for Flock Claims Portal"
            width={200}
            height={200}
            className="rounded-md shadow-md"
          />
        </div>
      </section>

      {/* Question and Answer Section */}
      <section className="space-y-6">
        <h2 className="text-xl lg:text-2xl font-semibold text-gray-800">
          Insurance Help Center
        </h2>
        <div className="space-y-4">
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">
              Who is Flock?
            </h3>
            <p className="text-gray-600">
              We’ve partnered with Flock, an FCA-regulated insurance provider,
              to offer you reliable, transparent, and flexible coverage tailored
              to your car subscription. Flock is known for its innovative
              approach to insurance, specialising in providing seamless,
              user-friendly insurance solutions for vehicles.
            </p>
          </div>
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">
              FCA-Regulated Partner
            </h3>
            <p className="text-gray-600">
              As our trusted insurance partner, Flock operates under strict
              regulations set by the Financial Conduct Authority (FCA), ensuring
              that your insurance needs are handled professionally and securely.
            </p>
          </div>
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">
              What Does Your Insurance Cover?
            </h3>
            <p className="text-gray-600">
              Your insurance policy with Flock provides comprehensive coverage,
              including:
            </p>
            <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
              <li>Damage protection</li>
              <li>Theft</li>
              <li>Third-party liability</li>
              <li>Personal accident benefits (if applicable)</li>
            </ul>
            <p className="text-gray-600 mt-4">
              For a detailed breakdown of your specific policy terms and
              conditions, please refer to the documentation provided during your
              subscription, located in your current subscription tab.
            </p>
          </div>
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">
              How to File a Claim
            </h3>
            <p className="text-gray-600">
              Filing a claim is quick and easy. Simply scan the QR code provided
              above. You’ll be redirected to Flock’s secure claims portal.
            </p>
            <p className="text-gray-600 mt-4">
              If you prefer to contact Flock directly, here are their contact
              details:
            </p>
            <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
              <li>Address: 123 Insurance Street, London, UK</li>
              <li>Phone: [Insert Flock’s customer service number]</li>
              <li>Email: [Insert Flock’s support email]</li>
            </ul>
          </div>
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">
              Need Assistance?
            </h3>
            <p className="text-gray-600">
              If you have questions about your insurance policy, or if you need
              help filing a claim, our dedicated support team is here to assist
              you.
            </p>
            <p className="text-gray-600 mt-4">You can:</p>
            <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
              <li>Visit our FAQ</li>
              <li>Ask our chatbot (on the bottom right of the screen)</li>
              <li>Contact our team directly via our support portal</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
