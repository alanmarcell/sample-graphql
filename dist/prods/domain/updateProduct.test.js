'use strict';

var _ptzAssert = require('ptz-assert');

var assert = _interopRequireWildcard(_ptzAssert);

var _index = require('./index');

var Product = _interopRequireWildcard(_index);

var _updateProduct = require('./updateProduct');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

describe('updateProduct', function () {
    var dbProduct, newProduct, updatedProduct;
    beforeEach(function () {
        dbProduct = Product.createProduct({
            id: 'OldId',
            name: 'OldProductName',
            category: 'alanmarcell@live.com',
            price: 100,
            createdBy: {
                dtCreated: new Date('1992-06-28'),
                ip: '192.168.0.1'
            }
        });
        newProduct = Product.createProduct({
            id: 'NewId',
            name: 'NewProductName',
            category: 'angeloocana@gmail.com',
            price: 200,
            createdBy: {
                dtCreated: new Date('1992-01-07'),
                ip: '192.168.0.1',
                user: {
                    userName: 'AlanMarcell',
                    displayName: 'Alan Marcell',
                    email: 'alanmarcell@live.com',
                    id: 'New_Id'
                }
            }
        });
        updatedProduct = (0, _updateProduct.updateProduct)(dbProduct, newProduct);
    });
    it('Should not update id', function () {
        assert.notEqual(newProduct.id, updatedProduct.id);
    });
    it('Should not update createdBy', function () {
        assert.notEqual(newProduct.createdBy, updatedProduct.createdBy);
    });
    it('Should update dtChanged', function () {
        newProduct.dtChanged = new Date('1992-06-28');
        assert.ok(updatedProduct.dtChanged);
        assert.ok(updatedProduct.dtChanged > newProduct.dtChanged);
    });
    it('Should add dtChanged', function () {
        newProduct.dtChanged = null;
        assert.ok(updatedProduct.dtChanged);
    });
    it('Should update name', function () {
        assert.equal(newProduct.name, updatedProduct.name);
    });
    it('Should update category', function () {
        assert.equal(newProduct.category, updatedProduct.category);
    });
    it('Should update price', function () {
        assert.equal(newProduct.price, updatedProduct.price);
    });
});
//# sourceMappingURL=updateProduct.test.js.map
//# sourceMappingURL=updateProduct.test.js.map