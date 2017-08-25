'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _menuSchema = require('../menus/menuSchema');

var _menuSchema2 = _interopRequireDefault(_menuSchema);

var _userSchema = require('../users/userSchema');

var _userSchema2 = _interopRequireDefault(_userSchema);

var _appSchema = require('./appSchema');

var _appSchema2 = _interopRequireDefault(_appSchema);

var _graphql = require('graphql');

var _graphqlRelay = require('graphql-relay');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Schema(userApp, authedUser, log) {
    var appSchema = (0, _appSchema2.default)({ log: log });
    var menuSchema = (0, _menuSchema2.default)({ log: log });
    var userSchema = (0, _userSchema2.default)({ userApp: userApp, authedUser: authedUser, log: log });
    var viewer = {};
    var viewerType = new _graphql.GraphQLObjectType({
        name: 'Viewer',
        fields: function fields() {
            return {
                id: (0, _graphqlRelay.globalIdField)('Viewer'),
                app: { type: appSchema.appType, resolve: function resolve() {
                        return _appSchema.app;
                    } },
                menu: { type: menuSchema.menuType, resolve: function resolve() {
                        return _menuSchema.menu;
                    } },
                userConnection: userSchema.getUserConnection()
            };
        }
    });
    var outputViewer = {
        type: viewerType,
        resolve: function resolve() {
            return viewer;
        }
    };
    var schema = new _graphql.GraphQLSchema({
        query: new _graphql.GraphQLObjectType({
            name: 'Query',
            fields: function fields() {
                return {
                    viewer: {
                        type: viewerType,
                        resolve: function resolve() {
                            return viewer;
                        }
                    }
                };
            }
        }),
        mutation: new _graphql.GraphQLObjectType({
            name: 'Mutation',
            fields: function fields() {
                return {
                    saveUser: userSchema.getSaveUserMutation(outputViewer),
                    getAuthToken: userSchema.getAuthTokenMutation(outputViewer)
                };
            }
        })
    });
    return schema;
}
exports.default = Schema;
//# sourceMappingURL=schema.js.map
//# sourceMappingURL=schema.js.map