'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.products = exports.allProducts = exports.lamp = exports.mobile = exports.hammer = undefined;

var _createProduct = require('./createProduct');

var hammer = exports.hammer = (0, _createProduct.createProduct)({
    name: 'Hammer',
    category: 'Hardware',
    price: 50
}); // Products for seed and test data
var mobile = exports.mobile = (0, _createProduct.createProduct)({
    name: 'Mobile',
    category: 'Eletronics',
    price: 1600.55
});
var lamp = exports.lamp = (0, _createProduct.createProduct)({
    name: 'lamp',
    category: 'Miscellaneous',
    price: 3.99
});
var allProducts = exports.allProducts = [hammer, mobile, lamp];
exports.default = allProducts;
var products = exports.products = {
    hammer: hammer,
    mobile: mobile,
    lamp: lamp,
    allProducts: allProducts
};
//# sourceMappingURL=products.js.map
//# sourceMappingURL=products.js.map