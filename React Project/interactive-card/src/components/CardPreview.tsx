import React from "react";
import cardFront from "../assets/bg-card-front.png";
import cardBack from "../assets/bg-card-back.png";
import cardLogo from "../assets/card-logo.svg";

interface CardData {
  name: string;
  number: string;
  month: string;
  year: string;
  cvc: string;
}

const CardPreview: React.FC<{ data: CardData }> = ({ data }) => {
  return (
    <div className="relative w-full max-w-md h-[300px] lg:h-[500px]">
      {/* Back Card */}
      <div
        className="absolute top-0 right-4 lg:top-24 lg:right-[-5rem] w-80 h-44 bg-no-repeat bg-cover rounded-lg shadow-lg"
        style={{ backgroundImage: `url(${cardBack})` }}
      >
        <div className="absolute top-[3.5rem] right-8 text-white tracking-widest text-sm">
          {data.cvc || "000"}
        </div>
      </div>

      {/* Front Card */}
      <div
        className="absolute bottom-0 left-4 lg:bottom-24 lg:left-[-5rem] w-80 h-44 bg-no-repeat bg-cover rounded-lg shadow-lg p-5 flex flex-col justify-between"
        style={{ backgroundImage: `url(${cardFront})` }}
      >
        <img src={cardLogo} alt="Card logo" className="w-12" />
        <div className="text-white tracking-[0.15em] text-lg">
          {data.number || "0000 0000 0000 0000"}
        </div>
        <div className="flex justify-between text-white text-sm uppercase">
          <span>{data.name || "Jane Appleseed"}</span>
          <span>
            {data.month || "00"}/{data.year || "00"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CardPreview;
