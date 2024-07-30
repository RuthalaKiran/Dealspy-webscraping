import {
  generateEmailBody,
  sendEmail,
} from "../EmailService/nodeMailer.js";
import Product from "../Models/productModel.js";
import { scrapAmazonProduct } from "../scraper/scraper.js";
import {
  getAveragePrice,
  getHighestPrice,
  getLowestPrice,
  Notification,
} from "../utils/util.js";

export const scrapAndStoreProduct = async (req, res) => {
  const { productUrl } = req.body;

  if (!productUrl) {
    return res.status(400).json({ message: "Product URL is required" });
  }

  try {
    const scrapedProduct = await scrapAmazonProduct(productUrl);
    if (!scrapedProduct) res.json({ status: "false" });
    let PRODUCT = scrapedProduct;

    const existingProduct = await Product.findOne({ url: scrapedProduct.url });

    if (existingProduct) {
      const updatedPriceHistory = [
        ...existingProduct.priceHistory,
        { price: scrapedProduct.currentPrice },
      ];

      PRODUCT = {
        ...scrapedProduct,
        priceHistory: updatedPriceHistory,
        lowestPrice: getLowestPrice(updatedPriceHistory),
        highestPrice: getHighestPrice(updatedPriceHistory),
        averagePrice: getAveragePrice(updatedPriceHistory),
      };
    }
    const newProduct = await Product.findOneAndUpdate(
      { url: scrapedProduct.url },
      PRODUCT,
      { upsert: true, new: true }
    );
    res.json({ status: true, data: newProduct });
  } catch (error) {
    throw new Error(`failed to create/update product: ${error.message}`);
    // res.json({status:false,data:error.message})
  }
};

export const getProductById = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error.message);
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({ status: true, data: products });
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};



export const addUserEmailToProduct = async (req, res) => {
  const { productId, useremail } = req.body;
  try {
    const product = await Product.findById(productId);
    if (!product) return;
    const userExists = product.users.some((user) => user.email === useremail);
    if (userExists){
        res.json({success:true,message:"user already there"})
    }
    if (!userExists) {
      product.users.push({ email: useremail });
      await product.save();
    }
    const emailContent = await generateEmailBody(product, Notification.WELCOME);
    await sendEmail(emailContent, [useremail]);
    res.json({status:true})
  } catch (error) {
    console.log(error)
  }
};
