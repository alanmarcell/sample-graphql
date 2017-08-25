'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.app = undefined;

var _graphql = require('graphql');

function AppSchema(_ref) {
    var log = _ref.log;

    var appType = new _graphql.GraphQLObjectType({
        name: 'App',
        fields: function fields() {
            return {
                title: { type: _graphql.GraphQLString },
                subTitle: { type: _graphql.GraphQLString }
            };
        }
    });
    return {
        appType: appType
    };
}
exports.default = AppSchema;
var app = exports.app = {
    title: 'Polutz',
    subTitle: 'Framework or Boilerplate?'
};
//# sourceMappingURL=appSchema.js.map
//# sourceMappingURL=appSchema.js.map