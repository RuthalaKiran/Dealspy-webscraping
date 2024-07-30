import { generateEmailBody, sendEmail } from "../EmailService/nodeMailer.js";
import Product from "../Models/productModel.js";
import { scrapAmazonProduct } from "../scraper/scraper.js";
import {
  getAveragePrice,
  getEmailNotifType,
  getHighestPrice,
  getLowestPrice,
} from "../utils/util.js";

export const cronjob = async (req, res) => {
  try {
    const products = await Product.find({});

    if (!products) {
      // throw new Error("No product fetched")
      // return;
    //   console.log("no products found");
    }

    // ======================== 1 SCRAPE LATEST PRODUCT DETAILS & UPDATE DB
    // console.log("fetched products",products);
    console.log("updated");
    const updatedProducts = await Promise.all(
      products.map(async (currentProduct) => {
        // Scrape product
        const scrapedProduct = await scrapAmazonProduct(currentProduct.url);

        if (!scrapedProduct) {
          console.log("no scraped products");
        }

        const updatedPriceHistory = [
          ...currentProduct.priceHistory,
          {
            price: scrapedProduct.currentPrice,
          },
        ];

        const product = {
          ...scrapedProduct,
          priceHistory: updatedPriceHistory,
          lowestPrice: getLowestPrice(updatedPriceHistory),
          highestPrice: getHighestPrice(updatedPriceHistory),
          averagePrice: getAveragePrice(updatedPriceHistory),
        };

        // Update Products in DB
        const updatedProduct = await Product.findOneAndUpdate(
          {
            url: product.url,
          },
          product
        );
        if (!updatedProduct)
          throw new Error(`Product with URL ${product.url} not found`);
        // ======================== 2 CHECK EACH PRODUCT'S STATUS & SEND EMAIL ACCORDINGLY
        const emailNotifType = getEmailNotifType(
          scrapedProduct,
          currentProduct
        );
    //    console.log("up to here")
        if (emailNotifType && updatedProduct.users.length > 0) {
          const productInfo = {
            title: updatedProduct.title,
            url: updatedProduct.url,
          };
          // Construct emailContent
          const emailContent = await generateEmailBody(
            productInfo,
            emailNotifType
          );
          // Get array of user emails
          const userEmails = updatedProduct.users.map((user) => user.email);
          // Send email notification
          await sendEmail(emailContent, userEmails);
        }

        // console.log("updated successfully");
      })
    );

    res.json({
      message: "Ok",
      data: updatedProducts,
    });
  } catch (error) {
    console.log(error)
    // res
    //   .status(500)
    //   .json({ error: `Failed to get all products: ${error.message}` });
  }
};
