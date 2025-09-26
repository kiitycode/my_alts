import React, { useState } from 'react';
import ImageCarousel from '../components/ImageCarousel';
import QuantitySelector from '../components/QuantitySelector';

const thumbnails = [
  '../assets/imageProduct1.jpg',
  '../assets/imageProduct2.jpg',
  '../assets/imageProduct3.jpg',
  '../assets/imageProduct4.jpg'
];

const ProductPage: React.FC = () => {
  const [mainImage, setMainImage] = useState(thumbnails[0]);
  const [quantity, setQuantity] = useState(1);

  const price = 125;
  const discount = 50;
  const originalPrice = 250;

  return (
    <main className="max-w-5xl mx-auto mt-12 px-4 lg:px-0 grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Left: Image + Thumbnails */}
      <ImageCarousel
        thumbnails={thumbnails}
        mainImage={mainImage}
        onChange={setMainImage}
      />

      {/* Right: Product Details */}
      <div className="flex flex-col justify-center">
        <h2 className="text-sm uppercase text-orange-500 font-bold">
          Sneaker Company
        </h2>
        <h1 className="text-3xl md:text-4xl font-bold mt-2">
          Fall Limited Edition Sneakers
        </h1>
        <p className="text-gray-600 mt-4">
          These low-profile sneakers are your perfect casual wear companion.
          Featuring a durable rubber outer sole, they’ll withstand everything
          the weather can offer.
        </p>

        {/* Pricing */}
        <div className="flex items-center mt-6">
          <span className="text-2xl md:text-3xl font-bold">
            ${price.toFixed(2)}
          </span>
          <span className="ml-4 bg-orange-100 text-orange-600 font-bold px-2 rounded">
            {discount}%
          </span>
          <span className="ml-auto text-gray-400 line-through">
            ${originalPrice.toFixed(2)}
          </span>
        </div>

        {/* Quantity + Add to Cart */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <QuantitySelector
            quantity={quantity}
            setQuantity={setQuantity}
          />
          <button
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg flex items-center justify-center shadow-md transition-colors"
          >
            <img
              src="/icon-cart-white.svg"
              alt=""
              className="w-5 h-5 mr-2"
            />
            Add to cart
          </button>
        </div>
      </div>
    </main>
  );
};

export default ProductPage;
