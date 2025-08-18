import React, { useCallback, useEffect, useRef, useState } from "react";
import QuantitySelector from "./QuantitySelector";
import { useCart } from "../context/CartContext";

// Product images
import imageProduct1 from "../assets/imageProduct1.jpg";
import imageProduct2 from "../assets/imageProduct2.jpg";
import imageProduct3 from "../assets/imageProduct3.jpg";
import imageProduct4 from "../assets/imageProduct4.jpg";

// Thumbnails
import thumbnail1 from "../assets/thumbnail1.jpg";
import thumbnail2 from "../assets/thumbnail2.jpg";
import thumbnail3 from "../assets/thumbnail3.jpg";
import thumbnail4 from "../assets/thumbnail4.jpg";

// Icons
import iconCart from "../assets/iconCart.svg";
import iconPrevious from "../assets/iconPrevious.svg";
import iconNext from "../assets/iconNext.svg";
import iconClose from "../assets/iconClose.svg";

const ProductCard: React.FC = () => {
  const images = [imageProduct1, imageProduct2, imageProduct3, imageProduct4];
  const thumbnails = [thumbnail1, thumbnail2, thumbnail3, thumbnail4];

  const [index, setIndex] = useState(0);
  const mainImage = images[index];

  // Use a stable number for total images and depend on it in callbacks
  const total = images.length;

  // Fix: wrap in useCallback so references are stable for useEffect deps
  const prev = useCallback(() => {
    setIndex((i) => (i === 0 ? total - 1 : i - 1));
  }, [total]);

  const next = useCallback(() => {
    setIndex((i) => (i === total - 1 ? 0 : i + 1));
  }, [total]);

  const [quantity, setQuantity] = useState(0);
  const { addItem } = useCart();

  const handleAddToCart = () => {
    if (quantity <= 0) return;
    addItem({
      id: "sneaker-fall-limited",
      title: "Fall Limited Edition Sneakers",
      price: 125,
      qty: quantity,
      thumbnail: thumbnails[index] ?? thumbnails[0],
    });
  };

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const lbRef = useRef<HTMLDivElement>(null);

  // Key handling for lightbox (Escape/Left/Right)
  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen, prev, next]);

  return (
    <section className="mx-auto max-w-7xl px-4 pb-16">
      <div className="mx-auto w-[80%]">
        {/* Grid layout with responsive spacing */}
        <div className="grid md:grid-cols-2 gap-10 md:gap-24 mt-6 md:mt-12">
          {/* LEFT: Gallery */}
          <div>
            {/* Main preview (clickable to open lightbox) */}
            <div className="relative md:rounded-2xl md:overflow-hidden w-full h-[320px] md:h-[520px] shadow-sm">
              <button
                className="w-full h-full"
                onClick={() => setLightboxOpen(true)}
                aria-label="open image preview"
                title="Click to preview"
              >
                <img src={mainImage} alt="product" className="w-full h-full object-cover" />
              </button>

              {/* Mobile prev/next */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                className="md:hidden absolute left-8 top-1/2 -translate-y-1/2 bg-white rounded-full w-10 h-10 grid place-items-center shadow"
                aria-label="previous image"
              >
                <img src={iconPrevious} alt="" className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                className="md:hidden absolute right-8 top-1/2 -translate-y-1/2 bg-white rounded-full w-10 h-10 grid place-items-center shadow"
                aria-label="next image"
              >
                <img src={iconNext} alt="" className="w-5 h-5" />
              </button>
            </div>

            {/* Thumbnails (desktop) */}
            <div className="hidden md:grid grid-cols-4 gap-6 mt-6 w-full">
              {thumbnails.map((thumb, i) => (
                <button
                  key={thumb}
                  onClick={() => setIndex(i)}
                  aria-label={`select image ${i + 1}`}
                  className={`rounded-xl overflow-hidden border-2 transition ${
                    index === i ? "border-orange-500" : "border-transparent"
                  }`}
                >
                  <img src={thumb} alt={`thumbnail ${i + 1}`} className="w-full h-24 object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: Info */}
          <div className="md:pt-4">
            <p className="uppercase tracking-[0.2em] text-gray-500 text-sm font-semibold">
              Sneaker Company
            </p>

            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mt-2">
              Fall Limited Edition Sneakers
            </h1>

            <p className="text-gray-600 mt-4">
              These low-profile sneakers are your perfect casual wear companion.
              Featuring a durable rubber outer sole, they’ll withstand everything
              the weather can offer.
            </p>

            {/* Price */}
            <div className="flex items-center justify-between md:justify-start md:gap-6 mt-6">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-extrabold">$125.00</span>
                <span className="px-2 py-1 rounded-md bg-gray-900 text-white text-sm font-bold">
                  50%
                </span>
              </div>
              <span className="text-gray-400 line-through font-semibold">$250.00</span>
            </div>

            {/* Actions */}
            <div className="mt-6 flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
              <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
              <button
                onClick={handleAddToCart}
                className="w-full md:w-auto inline-flex items-center justify-center gap-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-2xl px-8 py-4 shadow-md"
              >
                <img src={iconCart} alt="" className="w-5 h-5" />
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* LIGHTBOX */}
      {lightboxOpen && (
        <>
          {/* Backdrop */}
          <button
            aria-label="close lightbox backdrop"
            className="fixed inset-0 bg-black/70 z-40"
            onClick={() => setLightboxOpen(false)}
          />

          {/* Modal */}
          <div
            ref={lbRef}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
          >
            <div className="relative max-w-3xl w-full">
              {/* Close */}
              <button
                onClick={() => setLightboxOpen(false)}
                className="absolute -top-10 right-0 bg-white/90 hover:bg-white rounded-full p-2 shadow"
                aria-label="close preview"
              >
                <img src={iconClose} alt="" className="w-5 h-5" />
              </button>

              {/* Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img src={mainImage} alt="preview large" className="w-full h-auto md:h-[580px] object-cover" />

                {/* Prev / Next */}
                <button
                  onClick={prev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full w-12 h-12 grid place-items-center shadow"
                  aria-label="previous image"
                >
                  <img src={iconPrevious} alt="" className="w-6 h-6" />
                </button>
                <button
                  onClick={next}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full w-12 h-12 grid place-items-center shadow"
                  aria-label="next image"
                >
                  <img src={iconNext} alt="" className="w-6 h-6" />
                </button>
              </div>

              {/* Thumbs inside lightbox (desktop) */}
              <div className="hidden md:grid grid-cols-4 gap-6 mt-6">
                {thumbnails.map((t, i) => (
                  <button
                    key={t}
                    onClick={() => setIndex(i)}
                    aria-label={`select image ${i + 1}`}
                    className={`rounded-xl overflow-hidden border-2 transition ${
                      index === i ? "border-orange-500" : "border-transparent"
                    }`}
                  >
                    <img src={t} alt={`thumbnail ${i + 1}`} className="w-full h-24 object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default ProductCard;
