'use strict';

var _ptzAssert = require('ptz-assert');

var _index = require('./index');

var Core = _interopRequireWildcard(_index);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var MONGO_URL = 'mongodb://localhost:27017/ptz-core-repo';
var productRepository;
describe('ProductRepository', function () {
    beforeEach(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return Core.createProductRepository(MONGO_URL, 'test-collection');

                    case 2:
                        productRepository = _context.sent;

                    case 3:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    })));
    describe('getOtherProductsWithSameProductName', function () {
        it('find by name', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
            var product, product2, productDb;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            product = {
                                id: 'testid',
                                category: 'Hardware',
                                name: 'Hammer',
                                price: 50
                            };
                            product2 = {
                                id: 'testid2',
                                category: 'Hardware',
                                name: 'Hammer',
                                price: 60
                            };
                            _context2.next = 4;
                            return productRepository.save(product);

                        case 4:
                            _context2.next = 6;
                            return productRepository.getOtherProductsWithSameProductName(product2);

                        case 6:
                            productDb = _context2.sent;

                            (0, _ptzAssert.equal)(productDb[0].name, product2.name);
                            (0, _ptzAssert.notEqual)(productDb[0].id, product2.id);

                        case 9:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, undefined);
        })));
        it('not found', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
            var product, productDb;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            product = {
                                id: 'testid',
                                category: 'Hardware',
                                name: 'dgh3t4hd@gmail.com',
                                price: 50
                            };
                            _context3.next = 3;
                            return productRepository.getOtherProductsWithSameProductName(product);

                        case 3:
                            productDb = _context3.sent;

                            (0, _ptzAssert.emptyArray)(productDb);

                        case 5:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, undefined);
        })));
    });
    describe('getByProductName', function () {
        it('find by name', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
            var product, productDb;
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            product = {
                                id: 'testid',
                                category: 'Hardware',
                                name: 'Hammer',
                                price: 60
                            };
                            _context4.next = 3;
                            return productRepository.save(product);

                        case 3:
                            _context4.next = 5;
                            return productRepository.getByProductName('Hammer');

                        case 5:
                            productDb = _context4.sent;

                            (0, _ptzAssert.ok)(productDb);
                            (0, _ptzAssert.equal)(productDb.id, product.id);
                            (0, _ptzAssert.equal)(productDb.category, product.category);
                            (0, _ptzAssert.equal)(productDb.name, product.name);
                            (0, _ptzAssert.equal)(productDb.price, product.price);

                        case 11:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, undefined);
        })));
        it('find by price', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
            var product, productDb;
            return regeneratorRuntime.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            product = {
                                id: 'testid',
                                category: 'Hardware',
                                name: 'Hammer',
                                price: 60
                            };
                            _context5.next = 3;
                            return productRepository.save(product);

                        case 3:
                            _context5.next = 5;
                            return productRepository.getByProductName('Hammer');

                        case 5:
                            productDb = _context5.sent;

                            (0, _ptzAssert.ok)(productDb);
                            (0, _ptzAssert.equal)(productDb.id, product.id);
                            (0, _ptzAssert.equal)(productDb.category, product.category);
                            (0, _ptzAssert.equal)(productDb.name, product.name);
                            (0, _ptzAssert.equal)(productDb.price, product.price);

                        case 11:
                        case 'end':
                            return _context5.stop();
                    }
                }
            }, _callee5, undefined);
        })));
        it('not found', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
            var productDb;
            return regeneratorRuntime.wrap(function _callee6$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                        case 0:
                            _context6.next = 2;
                            return productRepository.getByProductName('dgdsfsfbsf');

                        case 2:
                            productDb = _context6.sent;

                            (0, _ptzAssert.notOk)(productDb);

                        case 4:
                        case 'end':
                            return _context6.stop();
                    }
                }
            }, _callee6, undefined);
        })));
    });
});
//# sourceMappingURL=productRepository.test.js.map
//# sourceMappingURL=productRepository.test.js.map