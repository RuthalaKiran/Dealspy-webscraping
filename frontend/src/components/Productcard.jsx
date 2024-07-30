import React from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const Productcard = ({ product }) => {
  return (
    <Link to={`/product/${product._id}`} className=" group product-card bg-gray-200">
      <div className="product-card_img-container">
        <img
          className="product-card_img group-hover:scale-105 duration-300  mix-blend-multiply"
          src={product.image}
          alt={product.title}
          width={200}
          height={200}
        />
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="group-hover:text-blue-900 product-title">{product.title}</h3>
        <div className="flex justify-around">
          <p className="text-black flex items-center justify-center gap-1 opacity-50 text-lg ">
            <FaStar className="text-yellow-400 text-xl mb-1" />{" "}
             <span>{product.stars}</span>
          </p>
          <p className="text-black text-md font-semibold">
            <span>{product?.currency}</span> <span>{product?.currentPrice}</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Productcard;
