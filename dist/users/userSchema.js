'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _graphql = require('graphql');

var _graphqlRelay = require('graphql-relay');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function UserSchema(_ref) {
    var userApp = _ref.userApp,
        authedUser = _ref.authedUser,
        log = _ref.log;

    var userType = new _graphql.GraphQLObjectType({
        name: 'User',
        fields: function fields() {
            return {
                id: { type: _graphql.GraphQLString },
                userName: { type: _graphql.GraphQLString },
                email: { type: _graphql.GraphQLString },
                emailConfirmed: { type: _graphql.GraphQLBoolean },
                displayName: { type: _graphql.GraphQLString },
                imgUrl: { type: _graphql.GraphQLString },
                // createdBy,
                // dtChanged,
                errors: { type: new _graphql.GraphQLList(_graphql.GraphQLString) }
            };
        }
    });
    var userConnection = (0, _graphqlRelay.connectionDefinitions)({
        name: 'User',
        nodeType: userType
    });
    function getUserConnection() {
        return {
            type: userConnection.connectionType,
            args: _graphqlRelay.connectionArgs,
            resolve: function resolve(_, args, ctx) {
                log('getting users');
                return (0, _graphqlRelay.connectionFromPromisedArray)(userApp.findUsers({
                    query: {},
                    options: { limit: args.first },
                    authedUser: ctx.createdBy
                }), args);
            }
        };
    }
    function getSaveUserMutation(outputViewer) {
        var _this = this;

        return (0, _graphqlRelay.mutationWithClientMutationId)({
            name: 'SaveUser',
            inputFields: {
                id: { type: _graphql.GraphQLString },
                userName: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
                email: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
                displayName: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
                password: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
                errors: { type: new _graphql.GraphQLList(_graphql.GraphQLString) }
            },
            outputFields: {
                userEdge: {
                    type: userConnection.edgeType,
                    resolve: function resolve(user) {
                        // log('ql user', user);
                        return { node: user, cursor: user.id };
                    }
                },
                viewer: outputViewer
            },
            mutateAndGetPayload: function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(userArgs, param2, param3) {
                    var savedUser;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    _context.prev = 0;

                                    log('saving user:', userArgs);
                                    // log('saving param2:', param2);
                                    // log('saving param3:', param3);
                                    _context.next = 4;
                                    return userApp.saveUser({
                                        userArgs: userArgs,
                                        authedUser: null
                                    });

                                case 4:
                                    savedUser = _context.sent;

                                    log('saved user:', savedUser);
                                    return _context.abrupt('return', savedUser);

                                case 9:
                                    _context.prev = 9;
                                    _context.t0 = _context['catch'](0);

                                    log('Error saving user:', _context.t0);

                                case 12:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, _this, [[0, 9]]);
                }));

                function mutateAndGetPayload(_x, _x2, _x3) {
                    return _ref2.apply(this, arguments);
                }

                return mutateAndGetPayload;
            }()
        });
    }
    function getAuthTokenMutation(outputViewer) {
        var _this2 = this;

        return (0, _graphqlRelay.mutationWithClientMutationId)({
            name: 'GetAuthToken',
            inputFields: {
                userNameOrEmail: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
                password: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) }
            },
            outputFields: {
                userEdge: {
                    type: userConnection.edgeType,
                    resolve: function resolve(authToken) {
                        if (authToken.user == null) return null;
                        return { node: authToken.user, cursor: authToken.user.id };
                    }
                },
                authToken: {
                    type: _graphql.GraphQLString,
                    resolve: function resolve(authToken) {
                        return authToken.authToken;
                    }
                },
                errors: {
                    type: new _graphql.GraphQLList(_graphql.GraphQLString),
                    resolve: function resolve(authToken) {
                        return authToken.errors;
                    }
                },
                viewer: outputViewer
            },
            mutateAndGetPayload: function () {
                var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(form, param2, param3) {
                    var authTokenArgs, authToken;
                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                        while (1) {
                            switch (_context2.prev = _context2.next) {
                                case 0:
                                    _context2.prev = 0;

                                    log('getAuthToken input:', form);
                                    authTokenArgs = {
                                        form: form,
                                        authedUser: authedUser
                                    };
                                    _context2.next = 5;
                                    return userApp.getAuthToken(authTokenArgs);

                                case 5:
                                    authToken = _context2.sent;

                                    log('getAuthToken return:', authToken);
                                    return _context2.abrupt('return', authToken);

                                case 10:
                                    _context2.prev = 10;
                                    _context2.t0 = _context2['catch'](0);

                                    log('Error saving user:', _context2.t0);

                                case 13:
                                case 'end':
                                    return _context2.stop();
                            }
                        }
                    }, _callee2, _this2, [[0, 10]]);
                }));

                function mutateAndGetPayload(_x4, _x5, _x6) {
                    return _ref3.apply(this, arguments);
                }

                return mutateAndGetPayload;
            }()
        });
    }
    return {
        getSaveUserMutation: getSaveUserMutation,
        getUserConnection: getUserConnection,
        getAuthTokenMutation: getAuthTokenMutation
    };
}
exports.default = UserSchema;
//# sourceMappingURL=userSchema.js.map
//# sourceMappingURL=userSchema.js.map