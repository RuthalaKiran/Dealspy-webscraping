import axios from "axios";
import * as cheerio from "cheerio";
import {
  extractCurrency,
  extractDescription,
  extractPrice,

} from "../utils/util.js";

export async function scrapAmazonProduct(url) {
  if (!url) return;

  // brightdata proxy configuration

  //   curl --proxy brd.superproxy.io:22225 --proxy-user brd-customer-hl_29079d0f-zone-pricesscrap:24ceruthfv77 -k https://geo.brdtest.com/mygeo.json
  // curl --proxy brd.superproxy.io:22225 --proxy-user brd-customer-hl_29079d0f-zone-pricesscrap:24ceruthfv77 -k "https://geo.brdtest.com/mygeo.json"
  const username = String(process.env.BRIGHTDATA_USERNAME);
  const password = String(process.env.BRIGHTDATA_PASSWORD);
  const port = 22225;
  const session_id = (10000000 * Math.random()) | 0;
  const options = {
    auth: {
      username: `${username}-session-${session_id}`,
      password,
    },
    host: "brd.superproxy.io",
    port,
    rejectUnauthorized: false,
  };

  try {
    const { data } = await axios.get(url, options);
    const $ = cheerio.load(data);
    const title = $("#productTitle").text().trim();
    const currentprice = extractPrice(
      $(".priceToPay span.a-price-whole"),
      $("a.size.base.a-color-price"),
      $(".a-button-selected .a-color-base"),
      $(".a-price.a-text-price")
    );
    const originalprice = extractPrice(
      $("#priceblock_ourprice"),
      $(".a-price.a-text-price span.a-offscreen"),
      $("#listPrice"),
      $("#priceblock_dealprice"),
      $(".a-size-base.a-color-price")
    );
    const outOfStock =
      $("#availability span").text().trim().toLowerCase() ===
      "currently unavailable";
    const images =
      $("#imgBlkFront").attr("data-a-dynamic-image") ||
      $("#landingImage").attr("data-a-dynamic-image");
    const imageUrls = Object.keys(JSON.parse(images));
    const currency = extractCurrency($(".a-price-symbol"));
    const discountRate = $(".savingsPercentage").text().replace(/[-%]/g, "");
    const description = extractDescription($)
    const reviews = $('a#acrCustomerReviewLink span#acrCustomerReviewText').text().trim().split(" ")[0]
    const stars = $('.a-declarative .a-color-base').text().trim() || $('.a-declarative .a-size-base').text().trim()
    const desc = $('#feature-bullets .a-unordered-list .a-spacing-mini .a-list-item').text()
    const productDetails = {
      url,
      currency: currency || "₹",
      image: imageUrls[0],
      title,
      currentPrice: Number(currentprice) ,
      originalPrice: Number(originalprice) ,
      priceHistory: [],
      discountRate: Number(discountRate),
      category: "category",
      reviewsCount: reviews || 0,
      stars:parseFloat(stars.slice(0,3)) || 0,
      isoutOfStock: outOfStock,
      description:desc || description,
      // descPoints:desc,
      lowestPrice: Number(currentprice) || Number(originalprice),
      highestPrice: Number(originalprice) || Number(currentprice),
      averagePrice: Number(currentprice) || Number(originalprice),
    };
    return productDetails;
  } catch (error) {
    throw new Error(`failed to scrape product ${error.message}`);
  }
}
