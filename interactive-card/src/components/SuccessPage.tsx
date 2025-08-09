import React from "react";
import successIcon from "../assets/icon-complete.svg";

interface Props {
  onContinue: () => void;
}

const SuccessPage: React.FC<Props> = ({ onContinue }) => {
  return (
    <div className="flex flex-col items-center text-center px-6 py-10 bg-white rounded-lg max-w-sm mx-auto">
      {/* Success Icon */}
      <img
        src={successIcon}
        alt="Success"
        className="w-16 h-16 mb-8"
      />

      {/* Heading */}
      <h2 className="text-purple950 text-[1.75rem] tracking-[0.2em] uppercase font-medium mb-3">
        Thank You!
      </h2>

      {/* Message */}
      <p className="text-gray500 text-base mb-10">
        We’ve added your card details
      </p>

      {/* Continue Button */}
      <button
        onClick={onContinue}
        className="bg-purple950 text-white w-full py-3 rounded-lg hover:opacity-90 transition"
      >
        Continue
      </button>
    </div>
  );
};

export default SuccessPage;
