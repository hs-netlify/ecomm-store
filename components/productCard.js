import React from "react";
import Image from "next/image";

const ProductCard = ({ product }) => {
  return (
    <div
      data-sb-object-id={product?.sys?.id}
      key={product?.name}
      className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
    >
      <div
        data-sb-object-id={product?.imagesCollection?.items[0]?.sys?.id}
        className="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none group-hover:opacity-75 sm:h-96"
      >
        <Image
          src={product?.imagesCollection?.items[0]?.image?.url}
          alt={product?.imagesCollection?.items[0]?.image?.description}
          width={500}
          height={500}
          className="h-full w-full object-cover object-center sm:h-full sm:w-full"
        />
      </div>
      <div className="flex flex-1 flex-col space-y-2 p-4">
        <h3
          className="text-sm font-medium text-gray-900"
          data-sb-field-path=".name"
        >
          {product?.name}
        </h3>
        <p data-sb-field-path=".description" className="text-sm text-gray-500">
          {product?.description}
        </p>
        <div className="flex flex-1 flex-col justify-end">
          <p className="text-base font-medium text-gray-900"></p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
