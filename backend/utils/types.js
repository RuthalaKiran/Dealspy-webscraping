// PriceHistoryItem type
/**
 * @typedef {Object} PriceHistoryItem
 * @property {number} price - The price of the item at a specific time.
 */

// User type
/**
 * @typedef {Object} User
 * @property {string} email - The email address of the user.
 */

// Product type
/**
 * @typedef {Object} Product
 * @property {string} [_id] - The unique identifier of the product (optional).
 * @property {string} url - The URL of the product.
 * @property {string} currency - The currency of the product price.
 * @property {string} image - The URL of the product image.
 * @property {string} title - The title of the product.
 * @property {number} currentPrice - The current price of the product.
 * @property {number} originalPrice - The original price of the product.
 * @property {Array<PriceHistoryItem>} priceHistory - The price history of the product.
 * @property {number} highestPrice - The highest price recorded for the product.
 * @property {number} lowestPrice - The lowest price recorded for the product.
 * @property {number} averagePrice - The average price of the product.
 * @property {number} discountRate - The discount rate for the product.
 * @property {string} description - The description of the product.
 * @property {string} category - The category of the product.
 * @property {number} reviewsCount - The number of reviews for the product.
 * @property {number} stars - The rating stars of the product.
 * @property {boolean} isOutOfStock - Indicates if the product is out of stock.
 * @property {Array<User>} [users] - The list of users related to the product (optional).
 */

// NotificationType type
/**
 * @typedef {"WELCOME" | "CHANGE_OF_STOCK" | "LOWEST_PRICE" | "THRESHOLD_MET"} NotificationType
 */

// EmailContent type
/**
 * @typedef {Object} EmailContent
 * @property {string} subject - The subject of the email.
 * @property {string} body - The body content of the email.
 */

// EmailProductInfo type
/**
 * @typedef {Object} EmailProductInfo
 * @property {string} title - The title of the product in the email.
 * @property {string} url - The URL of the product in the email.
 */
