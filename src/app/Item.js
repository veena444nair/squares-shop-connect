import React from "react";

function Item({ item, image }) {
  const name = item.itemData.name;
  const amount = parseInt(
    item.itemData.variations[0].itemVariationData.priceMoney.amount
  );

  return (
    <div className="max-w-sm mx-auto bg-white shadow-xl rounded-lg overflow-hidden p-8 mb-4">
      <img
        src={image ? image : "https://show.viusoft.com/products/no_image.png"}
        alt="Product Image"
        className="w-56 h-56 object-cover cursor-pointer mx-auto transform transition-transform hover:scale-110 "
      />
      <div className="flex p-4 justify-between">
        <h2 className="text-xl font-semibold text-gray-800 cursor-default relative group py-2">
          {name}
          <span className="absolute inset-x-0 bottom-0 h-1 bg-gray-800 w-0 transition-all duration-300 group-hover:w-full"></span>
        </h2>
        <p className="text-gray-600 mt-1 cursor-default border-hover relative group py-2">
          ${amount}
          <span className="absolute inset-x-0 bottom-0 h-1 bg-gray-800 w-0 transition-all duration-300 group-hover:w-full"></span>
        </p>
      </div>
    </div>
  );
}

export default Item;
