import React, { useState } from "react";
import axios from "axios";
import { url } from "../../utils/util.js";
import { useNavigate } from "react-router-dom";

const Searchbar = () => {
  const [searchlink, setsearchlink] = useState("");
  const [isloading, setisloading] = useState(false);
  const navigate = useNavigate()
  const isvalidAmazonProductURL = (url) => {
    try {
      const parsedURL = new URL(url);
      const hostname = parsedURL.hostname;

      //check if hostname contains amazon.com
      if (
        hostname.includes("amazon.com") ||
        hostname.includes("amazon.") ||
        hostname.endsWith("amazon")
      ) {
        return true;
      }
    } catch (error) {
      console.log(error);
    }
    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValidlink = isvalidAmazonProductURL(searchlink);
    // alert(isValidlink ? "valid link" : "invalid link");
    if (!isValidlink) {
      return alert("please provide a valid amazon link");
    }
    try {
      setisloading(true);

      //scrape the product
      const product = await axios.post(
        `${url}/api/products/scrape`,
        { productUrl: searchlink },
        {
          headers: {
            'Content-Type': 'application/json',
          },
      }
      );
      console.log(product.data ,"fom search bar");
      if (product.data.status === true){
        navigate(`/product/${product.data.data._id}`)
      }
    } catch (error) {
      console.log(error);
    } finally {
      setisloading(false);
    }
  };

  return (
    <form className="flex flex-wrap gap-4 mt-12" onSubmit={handleSubmit}>
      <input
        value={searchlink}
        onChange={(e) => setsearchlink(e.target.value)}
        type="text"
        placeholder="enter product link"
        className="searchbar-input"
      />
      <button
        type="submit"
        disabled={searchlink === ""}
        className="searchbar-btn"
      >
        {isloading ? "Searching" : "search"}
      </button>
    </form>
  );
};

export default Searchbar;
