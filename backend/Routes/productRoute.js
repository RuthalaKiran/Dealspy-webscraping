import express from "express"
import {addUserEmailToProduct, getAllProducts, getProductById, scrapAndStoreProduct} from "../Controllers/productController.js"
import { cronjob } from "../cron/cron.js"


const productRouter = express.Router()

productRouter.get('/productslist',getAllProducts)
productRouter.post('/scrape',scrapAndStoreProduct)
productRouter.get('/updateproductsbycron',cronjob)
productRouter.get('/:productId',getProductById)
productRouter.post('/track',addUserEmailToProduct)



export default productRouter;
