import React from 'react';

interface Props {
  thumbnails: string[];
  mainImage: string;
  onChange: (img: string) => void;
}

const ImageCarousel: React.FC<Props> = ({
  thumbnails,
  mainImage,
  onChange,
}) => (
  <>
    <div className="rounded-xl overflow-hidden shadow-lg">
      <img
        src={mainImage}
        alt="Product preview"
        className="w-full h-96 object-cover"
      />
    </div>
    <div className="flex justify-between mt-4 gap-4">
      {thumbnails.map((thumb) => (
        <button
          key={thumb}
          onClick={() => onChange(thumb)}
          className={`flex-1 rounded-lg overflow-hidden border-2 transition ${
            mainImage === thumb
              ? 'border-orange-500'
              : 'border-transparent'
          }`}
        >
          <img
            src={thumb}
            alt="Thumbnail"
            className="w-full h-20 object-cover hover:opacity-80"
          />
        </button>
      ))}
    </div>
  </>
);

export default ImageCarousel;
