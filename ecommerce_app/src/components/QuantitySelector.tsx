import React from "react";

type Props = { quantity: number; setQuantity: (v: number) => void };

const QuantitySelector: React.FC<Props> = ({ quantity, setQuantity }) => {
  return (
    <div className="flex items-center justify-between gap-6 w-full md:w-auto bg-gray-50 rounded-2xl px-6 py-4">
      <button
        aria-label="decrease quantity"
        className="text-orange-500 text-2xl font-bold"
        onClick={() => setQuantity(Math.max(0, quantity - 1))}
      >
        –
      </button>
      <span className="text-lg font-semibold text-gray-900">{quantity}</span>
      <button
        aria-label="increase quantity"
        className="text-orange-500 text-2xl font-bold"
        onClick={() => setQuantity(quantity + 1)}
      >
        +
      </button>
    </div>
  );
};

export default QuantitySelector;
