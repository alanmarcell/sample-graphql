'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _productApp = require('./productApp');

Object.keys(_productApp).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _productApp[key];
    }
  });
});

var _allActions = require('./allActions');

Object.keys(_allActions).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _allActions[key];
    }
  });
});
//# sourceMappingURL=index.js.map