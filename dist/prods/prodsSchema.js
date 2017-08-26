'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getProds = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(log) {
        var res;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        res = [];
                        _context.next = 3;
                        return (0, _axios2.default)({
                            method: 'get',
                            url: 'http://localhost:3010/api/products'
                        }).then(function (response) {
                            res.push(response.data);
                        });

                    case 3:
                        return _context.abrupt('return', _ramda2.default.flatten(res));

                    case 4:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function _getProds(_x) {
        return _ref.apply(this, arguments);
    };
}();

var save = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref2) {
        var prodArgs = _ref2.prodArgs,
            createdBy = _ref2.createdBy,
            log = _ref2.log;
        var res;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        res = [];

                        log(prodArgs);
                        _context2.next = 4;
                        return (0, _axios2.default)({
                            method: 'post',
                            url: 'http://localhost:3010/api/product',
                            data: prodArgs
                        }).then(function (response) {
                            log('prodArgs', prodArgs);
                            res.push(response.data);
                        });

                    case 4:
                        return _context2.abrupt('return', _ramda2.default.flatten(res));

                    case 5:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));

    return function save(_x2) {
        return _ref3.apply(this, arguments);
    };
}();

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _graphql = require('graphql');

var _graphqlRelay = require('graphql-relay');

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var prodApp = {
    save: save
};
function ProdsSchema(log) {
    var prodsType = new _graphql.GraphQLObjectType({
        name: 'Prods',
        fields: function fields() {
            return {
                _id: { type: _graphql.GraphQLString },
                name: { type: _graphql.GraphQLString },
                price: { type: _graphql.GraphQLInt },
                category: { type: _graphql.GraphQLString }
            };
        }
    });
    var prodsConnection = (0, _graphqlRelay.connectionDefinitions)({
        name: 'Prods',
        nodeType: prodsType
    });
    function getProds() {
        return {
            type: prodsConnection.connectionType,
            args: _graphqlRelay.connectionArgs,
            resolve: function resolve(_, args, ctx) {
                log('getting prods');
                return (0, _graphqlRelay.connectionFromPromisedArray)(_getProds(log), args);
            }
        };
    }
    function getSaveProdMutation() {
        var _this = this;

        return (0, _graphqlRelay.mutationWithClientMutationId)({
            name: 'SaveProd',
            inputFields: {
                id: { type: _graphql.GraphQLString },
                prodName: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
                email: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
                displayName: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
                password: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
                errors: { type: new _graphql.GraphQLList(_graphql.GraphQLString) }
            },
            outputFields: {
                prodEdge: {
                    type: prodsConnection.edgeType,
                    resolve: function resolve(prod) {
                        log('ql prod', prod);
                        return { node: prod, cursor: prod.id };
                    }
                }
            },
            mutateAndGetPayload: function () {
                var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(prodArgs, param2, param3) {
                    var savedProd;
                    return regeneratorRuntime.wrap(function _callee3$(_context3) {
                        while (1) {
                            switch (_context3.prev = _context3.next) {
                                case 0:
                                    _context3.prev = 0;

                                    log('saving prod:', prodArgs);
                                    log('saving param2:', param2);
                                    log('saving param3:', param3);
                                    _context3.next = 6;
                                    return prodApp.save({
                                        prodArgs: prodArgs,
                                        createdBy: null,
                                        log: log
                                    });

                                case 6:
                                    savedProd = _context3.sent;

                                    log('saved prod:', savedProd);
                                    return _context3.abrupt('return', savedProd);

                                case 11:
                                    _context3.prev = 11;
                                    _context3.t0 = _context3['catch'](0);

                                    log('Error saving prod:', _context3.t0);

                                case 14:
                                case 'end':
                                    return _context3.stop();
                            }
                        }
                    }, _callee3, _this, [[0, 11]]);
                }));

                function mutateAndGetPayload(_x3, _x4, _x5) {
                    return _ref4.apply(this, arguments);
                }

                return mutateAndGetPayload;
            }()
        });
    }
    return {
        getProds: getProds,
        getSaveProdMutation: getSaveProdMutation
    };
}
exports.default = ProdsSchema;
//# sourceMappingURL=prodsSchema.js.map
//# sourceMappingURL=prodsSchema.js.map