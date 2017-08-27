"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Update old db product data with new product data.
 * @param oldProduct
 * @param newProduct
 */
var updateProduct = exports.updateProduct = function updateProduct(oldProduct, _ref) {
    var name = _ref.name,
        category = _ref.category,
        price = _ref.price;

    return Object.assign({}, oldProduct, {
        name: name,
        category: category,
        price: price,
        dtChanged: new Date()
    });
};
//# sourceMappingURL=updateProduct.js.map
//# sourceMappingURL=updateProduct.js.map