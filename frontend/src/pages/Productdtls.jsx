import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { url } from "../utils/util";
import { CiHeart } from "react-icons/ci";
import { IoMdShare } from "react-icons/io";
import { CiBookmark } from "react-icons/ci";
import { CiStar } from "react-icons/ci";
import { RiMessage2Fill } from "react-icons/ri";
import Priceinfocard from "../components/Priceinfo/Priceinfocard";
import { MdOutlineContentCopy } from "react-icons/md";

import img from "../assets/react.svg";
import Model from "../components/Model/Model";

const Productdtls = () => {
  const { productId } = useParams();
  const [details, setdetails] = useState({});
  const [showFullDescription, setshowFullDescription] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  console.log(productId);

  const getproductDetails = async () => {
    const response = await axios.get(
      `${url}/api/products/${productId && productId}`
    );
    setdetails(response.data);
  };
  console.log(details);

  useEffect(() => {
    getproductDetails();
  }, []);

  const handlecopy = async()=>{
    try {
      await navigator.clipboard.writeText(details.url);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000)
    } catch (error) {
      console.log(error)
    }
  }
  console.log(isCopied)

  return (
   <>
    {
      Object.keys(details).length !== 0?
      (
        <div className="product-container">
        <div className="flex gap-28 xl:flex-row flex-col">
          <div className="product-image">
            <img
              src={details.image}
              alt={details.title}
              width={580}
              height={400}
              className="mx-auto"
            />
          </div>
          <div className="flex-1 flex flex-col">
            <div className="flex justify-between items-start gap-5 flex-wrap pb-6">
              <div className="flex flex-col gap-3">
                <p className="text-[28px] text-secondary font-semibold">
                  {details.title}
                </p>
                <Link
                  to={details.url}
                  target="_blank"
                  className="text-base text-black opacity-50"
                >
                  Visit Product
                </Link>
              </div>
              <div className="flex items-center gap-3">
                <div className="product-hearts">
                  <CiHeart className="text-2xl" />
                  <p className="text-base  font-semibold text-[#D4677]">
                    {details.reviewsCount}
                  </p>
                </div>
                <div onClick={handlecopy} className={`p-2 ${isCopied? "bg-blue-500" : ""} cursor-pointer bg-white-200 rounded-10`}>
                  <MdOutlineContentCopy className="text-2xl" />
                </div>
              </div>
            </div>
            <div className="product-info ">
              <div className="flex flex-col gap-2">
                <p className="flex gap-3 text-[34px] text-secondary font-bold">
                  <span className="flex gap-4 items-center">
                    {details.discountRate ? (
                      <span className="flex items-center text-[30px] font-light">
                        -{details.discountRate}%
                      </span>
                    ) : (
                      ""
                    )}
                    <span> {details.currency}</span>
                  </span>
                  <span>{details.currentPrice}</span>
                </p>
                <p className="flex gap-3 text-[21px] text-black opacity-50 line-through font-bold">
                  <span> {details.currency}</span>
                  <span>{details.originalPrice}</span>
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex gap-3">
                  <div className="product-stars">
                    <CiStar className="text-xl" />
                    <p className="text-sm text-primary-orange font-semibold">
                      {details.stars || 0}
                    </p>
                  </div>
                  <div className="product-reviews">
                    <RiMessage2Fill />
                    <p className="text-sm text-primary-orange font-semibold">
                      {details.reviewsCount || 0} Reviews
                    </p>
                  </div>
                </div>
                {/* <p className="text-sm text-black opacity-50">
                  <span className="text-primary-green">
                    90% have recommended this
                  </span>
                </p> */}
              </div>
            </div>
            <div className=" my-7 flex flex-col gap-5">
              <div className=" flex gap-5 flex-wrap">
                <Priceinfocard
                  title="Current Price"
                  icon={img}
                  value={`${details.currency} ${details.currentPrice}`}
                  bordercolor="#b6dbff"
                />
                <Priceinfocard
                  title="averagePrice"
                  icon={img}
                  value={`${details?.currency} ${details?.averagePrice}`}
                  bordercolor="#b6dbff"
                />
                <Priceinfocard
                  title="highestPrice"
                  icon={img}
                  value={`${details?.currency} ${
                    details?.originalPrice
                      ? details?.originalPrice
                      : details?.highestPrice
                  }`}
                  bordercolor="#b6dbff"
                />
                <Priceinfocard
                  title="lowestPrice"
                  icon={img}
                  value={`${details?.currency} ${details?.lowestPrice}`}
                  bordercolor="#b6dbff"
                />
              </div>
            </div>
            <Model productId={details._id} />
          </div>
        </div>
        <div className="flex flex-col gap-16 ">
          <div className="flex flex-col gap-5">
            <h3 className="text-2xl text-secondary font-semibold">
              product description
            </h3>
            <div>
              <div className="text-gray-500">
                {showFullDescription
                  ? details?.description && details.description
                  : details?.description?.slice(0, 350)}
                ... &nbsp;{" "}
                <span
                  onClick={() => setshowFullDescription(!showFullDescription)}
                  className="cursor-pointer  text-blue-500"
                >
                  {showFullDescription ? "see less" : "see more"}
                </span>{" "}
              </div>
            </div>
          </div>
          <Link
            className="btn w-fit min-w-[200px] mx-auto flex items-center justify-center gap-3"
            to={`${details.url}`}
            target="_blank"
          >
            Buy Now
          </Link>
        </div>
      </div>
      ) : (
        <div className="text-gray-800 text-xl flex items-center justify-center text-center h-[100vh]">Wait a moment we are fetching your request...</div>
      )
    }
   </>
  );
};

export default Productdtls;
