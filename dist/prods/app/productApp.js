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

var createApp = exports.createApp = function createApp(productAppArgs) {
    var productRepository = productAppArgs.productRepository;
    return {
        saveProduct: saveProduct({
            productRepository: productRepository,
            updateProduct: _domain.updateProduct
        }),
        findProducts: findProducts(productRepository.find),
        deleteProduct: deleteProduct,
        seed: seed
    };
};
var saveProduct = exports.saveProduct = _ramda2.default.curry(function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(func, args) {
        var product, productDb;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        args.productArgs.createdBy = args.authedUser;
                        product = (0, _domain.createProduct)(args.productArgs);

                        if (V.isValid(product)) {
                            _context.next = 4;
                            break;
                        }

                        return _context.abrupt('return', Promise.resolve(product));

                    case 4:
                        _context.next = 6;
                        return func.productRepository.getById(product.id);

                    case 6:
                        productDb = _context.sent;

                        if (productDb) product = func.updateProduct(productDb, product);
                        _context.next = 10;
                        return func.productRepository.save(product);

                    case 10:
                        product = _context.sent;
                        return _context.abrupt('return', Promise.resolve(product));

                    case 12:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
}());
// tslint:disable-next-line:max-line-length
var findProducts = exports.findProducts = _ramda2.default.curry(function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(find, args) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        return _context2.abrupt('return', find(args.query, { limit: args.options.limit }));

                    case 1:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function (_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}());
var seed = exports.seed = _ramda2.default.curry(function (productRepository, authedUser) {
    var products = _domain.products.allProducts;
    products.map(function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(product) {
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            _context3.next = 2;
                            return saveProduct({ productRepository: productRepository }, { productArgs: product, authedUser: authedUser });

                        case 2:
                            return _context3.abrupt('return', _context3.sent);

                        case 3:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, undefined);
        }));

        return function (_x5) {
            return _ref3.apply(this, arguments);
        };
    }());
    return Promise.resolve(true);
});
var deleteProduct = exports.deleteProduct = function deleteProduct(args) {
    return Promise.resolve(false);
};
//# sourceMappingURL=productApp.js.map
//# sourceMappingURL=productApp.js.map