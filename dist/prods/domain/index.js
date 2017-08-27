'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _allErrors = require('./allErrors');

Object.keys(_allErrors).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _allErrors[key];
    }
  });
});

var _createProduct = require('./createProduct');

Object.keys(_createProduct).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _createProduct[key];
    }
  });
});

var _products = require('./products');

Object.keys(_products).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _products[key];
    }
  });
});

var _updateProduct = require('./updateProduct');

Object.keys(_updateProduct).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _updateProduct[key];
    }
  });
});
//# sourceMappingURL=index.js.map