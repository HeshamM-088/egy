import React, { useState } from "react";
import {
  ChatBubbleLeftRightIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    orderNumber: "",
    helpType: "",
    country: "Egypt",
    details: "",
  });

  const [charCount, setCharCount] = useState(0);
  const maxChars = 500;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "details") {
      setCharCount(value.length);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-teal-50/50 dark:bg-gray-900 py-12 transition-colors duration-300 mb-1">
      <div className="max-w-4xl mx-auto px-4 ">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 text-center mb-12">
          Contact Us
        </h1>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8 mb-12 transition-colors duration-300">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                name="name"
                placeholder="First & Last Name*"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 placeholder:text-gray-500 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            <div>
              <input
                type="email"
                name="email"
                placeholder="Email*"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 placeholder:text-gray-500 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            <div>
              <input
                type="text"
                name="orderNumber"
                placeholder="Order Number*"
                value={formData.orderNumber}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 placeholder:text-gray-500 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            <div>
              <select
                name="helpType"
                value={formData.helpType}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 placeholder:text-gray-500 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all appearance-none"
              >
                <option value="">What can we help you with?*</option>
                <option value="general">General Inquiry</option>
                <option value="booking">Booking Support</option>
                <option value="technical">Technical Support</option>
                <option value="billing">Billing Question</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <select
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all appearance-none"
              >
                <option value="United States">United States</option>
                <option value="Egypt">Egypt</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Canada">Canada</option>
                <option value="Germany">Germany</option>
                <option value="France">France</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <textarea
                name="details"
                placeholder="Tell us details*"
                value={formData.details}
                onChange={handleInputChange}
                required
                rows={6}
                maxLength={maxChars}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 placeholder:text-gray-500 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all resize-none"
              />
              <div className="text-right text-sm text-gray-500 dark:text-gray-400 mt-1">
                {charCount}/{maxChars}
              </div>
            </div>

            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
              <p>
                In order to participate in our Contact Page, you acknowledge the
                following:
              </p>
              <p>
                1. You have read & consent to the terms & conditions described
                in EGY-Guide's Privacy Policy and Terms & Conditions.
              </p>
              <p>
                2. EGY-Guide may record and track the communications for various
                purposes & by continuing, you agree & grant EGY-Guide permission
                to do so.
              </p>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-teal-700 hover:bg-teal-800 text-white font-semibold py-3 px-14 text-xl rounded-full transition-colors duration-200 uppercase tracking-wide"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-8">
            Need more help?
          </h2>

          <div className="space-y-4 mb-8">
            <p className="text-gray-600 dark:text-gray-400">
              Customer service is available M-F 9AM-9PM EST & Sat-Sun 9AM-5PM
              EST, excluding holidays.
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Or call us at{" "}
              <a
                href="tel:+16469712676"
                className="text-gray-800 dark:text-teal-400 underline hover:text-gray-900 dark:hover:text-teal-300"
              >
                (+1) 646-971-2676
              </a>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center ">
            <button className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-800 dark:border-gray-600 text-gray-800 dark:text-gray-100 font-medium py-3 px-14 text-lg rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <ChatBubbleLeftRightIcon className="w-5 h-5" />
              Let's Chat
            </button>
            <button className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-800 dark:border-gray-600 text-gray-800 dark:text-gray-100 font-medium py-3 px-14 text-lg rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <PhoneIcon className="w-5 h-5" />
              Call Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
