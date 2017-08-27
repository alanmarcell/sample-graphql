'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _productRepository = require('./productRepository');

Object.keys(_productRepository).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _productRepository[key];
    }
  });
});
//# sourceMappingURL=index.js.map