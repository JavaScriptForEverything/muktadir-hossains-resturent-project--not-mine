import Image from "next/image";
import React from "react";

const FoodItemCard = ({ item }) => {
  const { title, description, price, images } = item;
  console.log(title, description, price, images);
  const imgUrl = images[0].replace("http://localhost:3000", "");
  return (
    <div className="w-1/4  p-5 bg-slate-500 rounded-sm mx-2 my-2">
      <div className="">
        <div className="overflow-hidden rounded-md text-center">
          <Image
            className="rounded-md hover:scale-110 hover:ease-in duration-300"
            src={imgUrl}
            height={300}
            width={300}
            alt={title}
          />
        </div>
        <h3 className="text-2xl py-2 text-center font-semibold text-white">
          {title}
        </h3>
        <p className="py-2 text-justify text-white">{description}</p>
        <div className="flex justify-between mt-2">
          <h2 className="bg-blue-200 p-1 rounded-sm">
            <span className="font-semibold">Price:</span> <span>$</span>
            {price}
          </h2>
          <p className="bg-blue-200 p-1 rounded-sm">
            <span className="font-semibold">Item Code:</span> 3301
          </p>
        </div>
      </div>
    </div>
  );
};

export default FoodItemCard;
