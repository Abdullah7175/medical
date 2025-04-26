"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TwoFactorPage() {
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [code, setCode] = useState("");

  const handleMethodSelect = (method) => {
    setSelectedMethod(method);
  };

  const handleVerify = (e) => {
    e.preventDefault();
  
    if (code === "123456") {
      alert("Login Successful!");
      
      const role = localStorage.getItem('role'); // Get saved role
      if (role === 'admin') {
        router.push("/admin/dashboard");
      } else if (role === 'doctor') {
        router.push("/doctor/dashboard");
      } else if (role === 'patient') {
        router.push("/patient/dashboard");
      } else {
        router.push("/dashboard"); // fallback
      }
    } else {
      alert("Invalid Code. Try 123456.");
    }
  };

  return (
    <div
      className="flex flex-col min-h-screen w-full items-center justify-center p-4 sm:p-6 bg-cover bg-center"
      style={{
        backgroundImage: "url('/pattern.png')",
      }}
    >
      <div className="w-full max-w-md bg-white/90 backdrop-blur-md p-6 sm:p-8 rounded-xl shadow-2xl">
        {!selectedMethod ? (
          <>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center text-blue-900">
              Two-Factor Authentication
            </h2>
            <p className="text-center text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
              Select a verification method
            </p>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <button
                onClick={() => handleMethodSelect("email")}
                className="flex items-center gap-3 sm:gap-4 w-full bg-blue-600 hover:bg-blue-950 text-white py-2 sm:py-3 px-3 sm:px-4 rounded-lg transition text-sm sm:text-lg font-semibold"
              >
                📧 Email Verification
              </button>
              <button
                onClick={() => handleMethodSelect("sms")}
                className="flex items-center gap-3 sm:gap-4 w-full bg-blue-600 hover:bg-blue-950 text-white py-2 sm:py-3 px-3 sm:px-4 rounded-lg transition text-sm sm:text-lg font-semibold"
              >
                📱 SMS Verification
              </button>
              <button
                onClick={() => handleMethodSelect("google")}
                className="flex items-center gap-3 sm:gap-4 w-full bg-blue-600 hover:bg-blue-950 text-white py-2 sm:py-3 px-3 sm:px-4 rounded-lg transition text-sm sm:text-lg font-semibold"
              >
                🔒 Google Authenticator
              </button>
              <button
                onClick={() => handleMethodSelect("other")}
                className="flex items-center gap-3 sm:gap-4 w-full bg-blue-600 hover:bg-blue-950 text-white py-2 sm:py-3 px-3 sm:px-4 rounded-lg transition text-sm sm:text-lg font-semibold"
              >
                ➕ Other Methods
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center text-blue-900">
              {selectedMethod === "email" && "📧 Email Verification"}
              {selectedMethod === "sms" && "📱 SMS Verification"}
              {selectedMethod === "google" && "🔒 Google Authenticator"}
              {selectedMethod === "other" && "➕ Other Verification"}
            </h2>
            <p className="text-gray-600 text-center mb-6 text-sm sm:text-base">
              Enter the 6-digit code you received
            </p>
            <form onSubmit={handleVerify} className="space-y-4">
              <div>
                <label
                  className="block text-sm font-medium mb-2 text-blue-900"
                  htmlFor="code"
                >
                  Verification Code
                </label>
                <input
                  id="code"
                  type="text"
                  maxLength={6}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter 6-digit code"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-900 hover:bg-blue-950 text-white py-2 sm:py-3 rounded-lg transition font-semibold"
              >
                Verify Code
              </button>
            </form>
            <button
              onClick={() => setSelectedMethod(null)}
              className="mt-6 text-sm text-blue-700 hover:underline w-full text-center"
            >
              ← Back to method selection
            </button>
          </>
        )}
      </div>
    </div>
  );
}
