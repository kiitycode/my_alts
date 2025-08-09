import React, { useState } from "react";
import CardPreview from "./components/CardPreview";
import PaymentForm from "./components/PaymentForm";
import SuccessPage from "./components/SuccessPage";

// Background images
import bgDesktop from "./assets/bg-main-desktop.png";
import bgMobile from "./assets/bg-main-mobile.png";

const App: React.FC = () => {
  const [data, setData] = useState({
    name: "",
    number: "",
    month: "",
    year: "",
    cvc: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (field: string, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add real validation
    setIsSubmitted(true);
  };

  const handleContinue = () => {
    // Reset for a new entry
    setData({
      name: "",
      number: "",
      month: "",
      year: "",
      cvc: "",
    });
    setIsSubmitted(false);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side Background + Card Preview */}
      <div
        className="relative w-full lg:w-[35%] min-h-[240px] lg:min-h-screen bg-no-repeat bg-cover"
        style={{
          backgroundImage: `url(${window.innerWidth >= 1024 ? bgDesktop : bgMobile})`,
        }}
      >
        <div className="absolute inset-0 flex flex-col lg:justify-center lg:pl-20 items-center lg:items-start gap-6 pt-12">
          <CardPreview data={data} />
        </div>
      </div>

      {/* Right Side Form / Success */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        {!isSubmitted ? (
          <div className="w-full max-w-sm">
            <PaymentForm
              data={data}
              onChange={handleChange}
              onSubmit={handleSubmit}
            />
          </div>
        ) : (
          <div className="w-full max-w-sm">
            <SuccessPage onContinue={handleContinue} />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
