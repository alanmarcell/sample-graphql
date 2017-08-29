'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createProduct = undefined;

var _ptzValidations = require('ptz-validations');

var V = _interopRequireWildcard(_ptzValidations);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

const createProductValidation = {
    id: [V.generateId],
    name: [V.required, V.isString, V.min(4), V.max(100)],
    category: [V.required, V.isString, V.min(4), V.max(100)],
    price: [V.isNumber, V.min(0)]
};
/**
 * Create product
 */
const createProduct = exports.createProduct = V.validate(createProductValidation);
//# sourceMappingURL=createProduct.js.map
//# sourceMappingURL=createProduct.js.map