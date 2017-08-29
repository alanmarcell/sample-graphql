'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getOtherProductsWithSameProductName = exports.getByProductName = exports.createProductRepository = undefined;

var _ptzCoreRepository = require('ptz-core-repository');

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const createProductRepository = exports.createProductRepository = _ramda2.default.curry((() => {
    var _ref = _asyncToGenerator(function* (url, collectionName) {
        const db = yield (0, _ptzCoreRepository.getDb)(url);
        const collection = (0, _ptzCoreRepository.getDbCollection)(db, collectionName);
        return {
            db,
            collectionName,
            save: (0, _ptzCoreRepository.save)(collection),
            getByIds: (0, _ptzCoreRepository.getByIds)(collection),
            find: (0, _ptzCoreRepository.find)(collection),
            getById: (0, _ptzCoreRepository.getById)(collection),
            getDbCollection: function getDbCollection() {
                return collection;
            },
            getOtherProductsWithSameProductName: getOtherProductsWithSameProductName(collection),
            getByProductName: getByProductName(collection)
        };
    });

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
})());
const getOtherProductsWithSameProductName = _ramda2.default.curry((collection, product) => {
    const query = {
        _id: { $ne: product.id },
        $or: [{ name: product.name }]
    };
    const select = {
        name: 1
    };
    return collection.find(query, select).toArray();
});
const getByProductName = _ramda2.default.curry((collection, productName) => {
    const query = {
        $or: [{ name: productName }]
    };
    return collection.findOne(query);
});
exports.getByProductName = getByProductName;
exports.getOtherProductsWithSameProductName = getOtherProductsWithSameProductName;
//# sourceMappingURL=productRepository.js.map
//# sourceMappingURL=productRepository.js.map