'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _graphql = require('graphql');

var _graphqlRelay = require('graphql-relay');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function ProdsSchema(_ref) {
    var productApp = _ref.productApp,
        authedUser = _ref.authedUser,
        log = _ref.log;

    var prodsType = new _graphql.GraphQLObjectType({
        name: 'Prods',
        fields: function fields() {
            return {
                _id: { type: _graphql.GraphQLString },
                name: { type: _graphql.GraphQLString },
                price: { type: _graphql.GraphQLFloat },
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
                return (0, _graphqlRelay.connectionFromPromisedArray)(productApp.findProducts({
                    query: {},
                    options: { limit: args.first },
                    authedUser: ctx.createdBy
                }), args);
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
                var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(productArgs, param2, param3) {
                    var savedProduct;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    _context.prev = 0;

                                    log('saving prod:', productArgs);
                                    log('saving param2:', param2);
                                    log('saving param3:', param3);
                                    _context.next = 6;
                                    return productApp.saveProduct({
                                        productArgs: productArgs,
                                        authedUser: null
                                    });

                                case 6:
                                    savedProduct = _context.sent;

                                    log('saved product:', savedProduct);
                                    return _context.abrupt('return', savedProduct);

                                case 11:
                                    _context.prev = 11;
                                    _context.t0 = _context['catch'](0);

                                    log('Error saving prod:', _context.t0);

                                case 14:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, _this, [[0, 11]]);
                }));

                function mutateAndGetPayload(_x, _x2, _x3) {
                    return _ref2.apply(this, arguments);
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