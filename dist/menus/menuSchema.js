'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.menu = undefined;

var _graphql = require('graphql');

function MenuSchema(_ref) {
    var log = _ref.log;

    var menuItemType = new _graphql.GraphQLObjectType({
        name: 'MenuItem',
        fields: function fields() {
            return {
                label: { type: _graphql.GraphQLString },
                link: { type: _graphql.GraphQLString },
                role: { type: _graphql.GraphQLString },
                subItems: { type: new _graphql.GraphQLList(menuItemType) }
            };
        }
    });
    var menuType = new _graphql.GraphQLObjectType({
        name: 'Menu',
        fields: function fields() {
            return {
                label: { type: _graphql.GraphQLString },
                items: { type: new _graphql.GraphQLList(menuItemType) }
            };
        }
    });
    return {
        menuItemType: menuItemType,
        menuType: menuType
    };
}
exports.default = MenuSchema;
var menu = exports.menu = {
    label: 'Menu',
    items: [{ label: 'Home', link: '/' }, { label: 'Github', link: 'https://github.com/polutz/polutz' }, { label: 'About Us', link: '/aboutus' }, { label: 'Contact', link: '/contact' }, { label: 'Faq', link: '/faq' }, { label: 'Log In', link: '/users/login' }, { label: 'Sign Up', link: '/users/signup' }, {
        label: 'Users',
        subItems: [{ label: 'User Report', link: '/users/report', role: 'USERS_VIEW' }]
    }]
};
//# sourceMappingURL=menuSchema.js.map
//# sourceMappingURL=menuSchema.js.map