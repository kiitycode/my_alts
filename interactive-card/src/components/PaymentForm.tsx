import React, { useState } from "react";

interface CardData {
  name: string;
  number: string;
  month: string;
  year: string;
  cvc: string;
}

interface Props {
  data: CardData;
  onChange: (field: string, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const PaymentForm: React.FC<Props> = ({ data, onChange, onSubmit }) => {
  const [errors, setErrors] = useState<Partial<CardData>>({});

  const validate = () => {
    const newErrors: Partial<CardData> = {};

    if (!data.name.trim()) newErrors.name = "Can't be blank";

    if (!data.number.trim()) {
      newErrors.number = "Can't be blank";
    } else if (!/^\d{4} \d{4} \d{4} \d{4}$/.test(data.number)) {
      newErrors.number = "Wrong format, numbers only";
    }

    if (!data.month.trim()) {
      newErrors.month = "Can't be blank";
    } else if (!/^\d{2}$/.test(data.month) || +data.month < 1 || +data.month > 12) {
      newErrors.month = "Invalid month";
    }

    if (!data.year.trim()) {
      newErrors.year = "Can't be blank";
    } else if (!/^\d{2}$/.test(data.year)) {
      newErrors.year = "Invalid year";
    }

    if (!data.cvc.trim()) {
      newErrors.cvc = "Can't be blank";
    } else if (!/^\d{3}$/.test(data.cvc)) {
      newErrors.cvc = "Invalid CVC";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) onSubmit(e);
  };

  const formatCardNumber = (value: string) => {
    return value
      .replace(/\D/g, "") // remove non-numbers
      .slice(0, 16) // limit length
      .replace(/(\d{4})(?=\d)/g, "$1 ") // space every 4 digits
      .trim();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 flex flex-col gap-4 rounded-lg shadow-sm"
    >
      {/* Cardholder Name */}
      <div>
        <label className="block text-sm uppercase tracking-wide text-purple950 mb-1">
          Cardholder Name
        </label>
        <input
          type="text"
          placeholder="e.g. Jane Appleseed"
          value={data.name}
          onChange={(e) => onChange("name", e.target.value)}
          className={`border rounded-lg p-2 w-full focus:outline-none ${
            errors.name ? "border-red-500" : "border-gray200"
          }`}
        />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
      </div>

      {/* Card Number */}
      <div>
        <label className="block text-sm uppercase tracking-wide text-purple950 mb-1">
          Card Number
        </label>
        <input
          type="text"
          placeholder="e.g. 1234 5678 9123 0000"
          value={data.number}
          onChange={(e) => onChange("number", formatCardNumber(e.target.value))}
          className={`border rounded-lg p-2 w-full focus:outline-none ${
            errors.number ? "border-red-500" : "border-gray200"
          }`}
        />
        {errors.number && <p className="text-red-500 text-xs mt-1">{errors.number}</p>}
      </div>

      {/* Expiration Date & CVC */}
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm uppercase tracking-wide text-purple950 mb-1">
            Exp. Date (MM/YY)
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="MM"
              value={data.month}
              onChange={(e) =>
                onChange("month", e.target.value.replace(/\D/g, "").slice(0, 2))
              }
              className={`border rounded-lg p-2 w-full focus:outline-none ${
                errors.month ? "border-red-500" : "border-gray200"
              }`}
            />
            <input
              type="text"
              placeholder="YY"
              value={data.year}
              onChange={(e) =>
                onChange("year", e.target.value.replace(/\D/g, "").slice(0, 2))
              }
              className={`border rounded-lg p-2 w-full focus:outline-none ${
                errors.year ? "border-red-500" : "border-gray200"
              }`}
            />
          </div>
          {(errors.month || errors.year) && (
            <p className="text-red-500 text-xs mt-1">
              {errors.month || errors.year}
            </p>
          )}
        </div>

        <div className="flex-1">
          <label className="block text-sm uppercase tracking-wide text-purple950 mb-1">
            CVC
          </label>
          <input
            type="text"
            placeholder="e.g. 123"
            value={data.cvc}
            onChange={(e) =>
              onChange("cvc", e.target.value.replace(/\D/g, "").slice(0, 3))
            }
            className={`border rounded-lg p-2 w-full focus:outline-none ${
              errors.cvc ? "border-red-500" : "border-gray200"
            }`}
          />
          {errors.cvc && <p className="text-red-500 text-xs mt-1">{errors.cvc}</p>}
        </div>
      </div>

      <button
        type="submit"
        className="bg-purple950 text-white py-3 rounded-lg mt-4 hover:opacity-90"
      >
        Confirm
      </button>
    </form>
  );
};

export default PaymentForm;
