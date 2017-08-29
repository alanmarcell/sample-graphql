'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _graphql = require('graphql');

var _graphqlRelay = require('graphql-relay');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function ProdsSchema({ productApp, authedUser, log }) {
    const prodsType = new _graphql.GraphQLObjectType({
        name: 'Prods',
        fields: () => ({
            _id: { type: _graphql.GraphQLString },
            name: { type: _graphql.GraphQLString },
            price: { type: _graphql.GraphQLFloat },
            category: { type: _graphql.GraphQLString }
        })
    });
    const prodsConnection = (0, _graphqlRelay.connectionDefinitions)({
        name: 'Prods',
        nodeType: prodsType
    });
    function getProds() {
        return {
            type: prodsConnection.connectionType,
            args: _graphqlRelay.connectionArgs,
            resolve: (_, args, ctx) => {
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
                    resolve: prod => {
                        log('ql prod', prod);
                        return { node: prod, cursor: prod.id };
                    }
                }
            },
            mutateAndGetPayload: (() => {
                var _ref = _asyncToGenerator(function* (productArgs, param2, param3) {
                    try {
                        log('saving prod:', productArgs);
                        log('saving param2:', param2);
                        log('saving param3:', param3);
                        const savedProduct = yield productApp.saveProduct({
                            productArgs,
                            authedUser: null
                        });
                        log('saved product:', savedProduct);
                        return savedProduct;
                    } catch (e) {
                        log('Error saving prod:', e);
                    }
                });

                return function mutateAndGetPayload(_x, _x2, _x3) {
                    return _ref.apply(this, arguments);
                };
            })()
        });
    }
    return {
        getProds,
        getSaveProdMutation
    };
}
exports.default = ProdsSchema;
//# sourceMappingURL=prodsSchema.js.map
//# sourceMappingURL=prodsSchema.js.map