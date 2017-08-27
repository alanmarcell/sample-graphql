'use strict';

var _ptzAssert = require('ptz-assert');

var _index = require('./index');

var Core = _interopRequireWildcard(_index);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

describe('ptz-product-repository', function () {
    describe('exports', function () {
        it('getOtherProductsWithSameProductName', function () {
            return (0, _ptzAssert.ok)(Core.getOtherProductsWithSameProductName);
        });
    });
});
//# sourceMappingURL=index.test.js.map
//# sourceMappingURL=index.test.js.map