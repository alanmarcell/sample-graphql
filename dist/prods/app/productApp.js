'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.deleteProduct = exports.seed = exports.findProducts = exports.saveProduct = exports.createApp = undefined;

var _ptzValidations = require('ptz-validations');

var V = _interopRequireWildcard(_ptzValidations);

var _domain = require('../domain');

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const createApp = exports.createApp = productAppArgs => {
    const productRepository = productAppArgs.productRepository;
    return {
        saveProduct: saveProduct({
            productRepository,
            updateProduct: _domain.updateProduct
        }),
        findProducts: findProducts(productRepository.find),
        deleteProduct,
        seed
    };
};
const saveProduct = exports.saveProduct = _ramda2.default.curry((() => {
    var _ref = _asyncToGenerator(function* (func, args) {
        args.productArgs.createdBy = args.authedUser;
        var product = (0, _domain.createProduct)(args.productArgs);
        if (!V.isValid(product)) return Promise.resolve(product);
        const productDb = yield func.productRepository.getById(product.id);
        if (productDb) product = func.updateProduct(productDb, product);
        product = yield func.productRepository.save(product);
        return Promise.resolve(product);
    });

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
})());
// tslint:disable-next-line:max-line-length
const findProducts = exports.findProducts = _ramda2.default.curry((() => {
    var _ref2 = _asyncToGenerator(function* (find, args) {
        return find(args.query, { limit: args.options.limit });
    });

    return function (_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
})());
const seed = exports.seed = _ramda2.default.curry((productRepository, authedUser) => {
    const products = _domain.products.allProducts;
    products.map((() => {
        var _ref3 = _asyncToGenerator(function* (product) {
            return yield saveProduct({ productRepository }, { productArgs: product, authedUser });
        });

        return function (_x5) {
            return _ref3.apply(this, arguments);
        };
    })());
    return Promise.resolve(true);
});
const deleteProduct = exports.deleteProduct = args => {
    return Promise.resolve(false);
};
//# sourceMappingURL=productApp.js.map
//# sourceMappingURL=productApp.js.map