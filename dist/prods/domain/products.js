'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.products = exports.allProducts = exports.lamp = exports.mobile = exports.hammer = undefined;

var _createProduct = require('./createProduct');

const hammer = exports.hammer = (0, _createProduct.createProduct)({
    name: 'Hammer',
    category: 'Hardware',
    price: 50
}); // Products for seed and test data
const mobile = exports.mobile = (0, _createProduct.createProduct)({
    name: 'Mobile',
    category: 'Eletronics',
    price: 1600.55
});
const lamp = exports.lamp = (0, _createProduct.createProduct)({
    name: 'lamp',
    category: 'Miscellaneous',
    price: 3.99
});
const allProducts = exports.allProducts = [hammer, mobile, lamp];
exports.default = allProducts;
const products = exports.products = {
    hammer,
    mobile,
    lamp,
    allProducts
};
//# sourceMappingURL=products.js.map
//# sourceMappingURL=products.js.map