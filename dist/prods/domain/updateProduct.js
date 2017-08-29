"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Update old db product data with new product data.
 * @param oldProduct
 * @param newProduct
 */
const updateProduct = exports.updateProduct = (oldProduct, { name, category, price }) => {
    return Object.assign({}, oldProduct, {
        name,
        category,
        price,
        dtChanged: new Date()
    });
};
//# sourceMappingURL=updateProduct.js.map
//# sourceMappingURL=updateProduct.js.map