import React, { useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import Searchbar from "../components/Searchbar/Searchbar";
import Herocaroucel from "../components/Herocarousel/Herocaroucel";
import axios from "axios";
import { url } from "../utils/util";
import Productcard from "../components/Productcard";
import SkelitonCardHomePage from "../components/SkelitonCardHomePage/SkelitonCardHomePage";

const Home = () => {
  const [products, setproducts] = useState([]);
  const [error, seterror] = useState(null);

  const fetchallProducts = async () => {
    try {
      const response = await axios.get(`${url}/api/products/productslist`);
      const allproducts = response.data.data;
      setproducts(allproducts);
      seterror(null);
    } catch (error) {
      console.log(`error while fetching ${error.message}`);
      seterror("error while fetching");
    }
  };
  console.log(products.length);

  useEffect(() => {
    fetchallProducts();
  }, []);

  return (
    <>
      <section className="px-6 py-24 md:px-20">
        <div className="flex flex-col items-center justify-center lg:flex-row gap-16">
          <div className="flex flex-col justify-center">
            <p className="group cursor-pointer small-text flex items-center">
              Smarter Deals Await
              <FaArrowRightLong className="group-hover:translate-x-3 duration-300" />
            </p>
            <h1 className="head-text text-red-500">
              Maximize Your Savings with{" "}
              <span className="text-blue-700">
                <span className="text-red-500 sm:text-[80px] text-[70px]">
                  D
                </span>
                ealSpy
              </span>
            </h1>
            <p className="mt-6 text-gray-700">
              DealSpy tracks Amazon products for you. Enter a link, and we’ll
              save the details and alert you when prices drop or discounts are
              available.
            </p>
            <Searchbar />
          </div>
          <Herocaroucel />
        </div>
      </section>

      <section className="trending-section">
        <h2 className="section-text s">Users Frequent Searchs</h2>
        {products.length !== 0 ? (
          <div className="flex  p-2 items-centers justify-around flex-wrap gap-x-8 gap-y-16">
            {products?.map((item) => (
              <Productcard key={item._id} product={item} />
            ))}
          </div>
        ) : (
          <div className="flex p-2 justify-around flex-wrap gap-x-8 gap-y-16">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <SkelitonCardHomePage />
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default Home;
