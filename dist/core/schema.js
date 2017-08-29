'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _graphql = require('graphql');

var _graphqlRelay = require('graphql-relay');

var _prodsSchema = require('../prods/prodsSchema');

var _prodsSchema2 = _interopRequireDefault(_prodsSchema);

var _userSchema = require('../users/userSchema');

var _userSchema2 = _interopRequireDefault(_userSchema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Schema(userApp, productApp, authedUser, log) {
    const userSchema = (0, _userSchema2.default)({ userApp, authedUser, log });
    const prodsSchema = (0, _prodsSchema2.default)({ productApp, authedUser, log });
    const viewer = {};
    const viewerType = new _graphql.GraphQLObjectType({
        name: 'Viewer',
        fields: () => ({
            id: (0, _graphqlRelay.globalIdField)('Viewer'),
            userConnection: userSchema.getUserConnection(),
            prods: prodsSchema.getProds()
        })
    });
    const outputViewer = {
        type: viewerType,
        resolve: () => viewer
    };
    const schema = new _graphql.GraphQLSchema({
        query: new _graphql.GraphQLObjectType({
            name: 'Query',
            fields: () => ({
                viewer: {
                    type: viewerType,
                    resolve: () => viewer
                }
            })
        }),
        mutation: new _graphql.GraphQLObjectType({
            name: 'Mutation',
            fields: () => ({
                saveUser: userSchema.getSaveUserMutation(outputViewer),
                getAuthToken: userSchema.getAuthTokenMutation(outputViewer),
                saveProd: prodsSchema.getSaveProdMutation()
            })
        })
    });
    return schema;
}
exports.default = Schema;
//# sourceMappingURL=schema.js.map
//# sourceMappingURL=schema.js.map