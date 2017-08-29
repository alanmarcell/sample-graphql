'use strict';

var _ptzAssert = require('ptz-assert');

var _index = require('./index');

var Core = _interopRequireWildcard(_index);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const MONGO_URL = 'mongodb://localhost:27017/ptz-core-repo';
var productRepository;
describe('ProductRepository', () => {
    beforeEach(_asyncToGenerator(function* () {
        productRepository = yield Core.createProductRepository(MONGO_URL, 'test-collection');
    }));
    describe('getOtherProductsWithSameProductName', () => {
        it('find by name', _asyncToGenerator(function* () {
            const product = {
                id: 'testid',
                category: 'Hardware',
                name: 'Hammer',
                price: 50
            };
            const product2 = {
                id: 'testid2',
                category: 'Hardware',
                name: 'Hammer',
                price: 60
            };
            yield productRepository.save(product);
            const productDb = yield productRepository.getOtherProductsWithSameProductName(product2);
            (0, _ptzAssert.equal)(productDb[0].name, product2.name);
            (0, _ptzAssert.notEqual)(productDb[0].id, product2.id);
        }));
        it('not found', _asyncToGenerator(function* () {
            const product = {
                id: 'testid',
                category: 'Hardware',
                name: 'dgh3t4hd@gmail.com',
                price: 50
            };
            const productDb = yield productRepository.getOtherProductsWithSameProductName(product);
            (0, _ptzAssert.emptyArray)(productDb);
        }));
    });
    describe('getByProductName', () => {
        it('find by name', _asyncToGenerator(function* () {
            const product = {
                id: 'testid',
                category: 'Hardware',
                name: 'Hammer',
                price: 60
            };
            yield productRepository.save(product);
            const productDb = yield productRepository.getByProductName('Hammer');
            (0, _ptzAssert.ok)(productDb);
            (0, _ptzAssert.equal)(productDb.id, product.id);
            (0, _ptzAssert.equal)(productDb.category, product.category);
            (0, _ptzAssert.equal)(productDb.name, product.name);
            (0, _ptzAssert.equal)(productDb.price, product.price);
        }));
        it('find by price', _asyncToGenerator(function* () {
            const product = {
                id: 'testid',
                category: 'Hardware',
                name: 'Hammer',
                price: 60
            };
            yield productRepository.save(product);
            const productDb = yield productRepository.getByProductName('Hammer');
            (0, _ptzAssert.ok)(productDb);
            (0, _ptzAssert.equal)(productDb.id, product.id);
            (0, _ptzAssert.equal)(productDb.category, product.category);
            (0, _ptzAssert.equal)(productDb.name, product.name);
            (0, _ptzAssert.equal)(productDb.price, product.price);
        }));
        it('not found', _asyncToGenerator(function* () {
            const productDb = yield productRepository.getByProductName('dgdsfsfbsf');
            (0, _ptzAssert.notOk)(productDb);
        }));
    });
});
//# sourceMappingURL=productRepository.test.js.map
//# sourceMappingURL=productRepository.test.js.map