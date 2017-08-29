'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _graphql = require('graphql');

var _graphqlRelay = require('graphql-relay');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const expiresIn = 1000000; // seconds
function UserSchema({ userApp, authedUser, log }) {
    const userType = new _graphql.GraphQLObjectType({
        name: 'User',
        fields: () => ({
            id: { type: _graphql.GraphQLString },
            userName: { type: _graphql.GraphQLString },
            email: { type: _graphql.GraphQLString },
            emailConfirmed: { type: _graphql.GraphQLBoolean },
            displayName: { type: _graphql.GraphQLString },
            imgUrl: { type: _graphql.GraphQLString },
            // createdBy,
            // dtChanged,
            errors: { type: new _graphql.GraphQLList(errorType) }
        })
    });
    const errorType = new _graphql.GraphQLObjectType({
        name: 'Errors',
        fields: () => ({
            propName: { type: _graphql.GraphQLString },
            errorMsg: { type: _graphql.GraphQLString }
        })
    });
    const userConnection = (0, _graphqlRelay.connectionDefinitions)({
        name: 'User',
        nodeType: userType
    });
    function getUserConnection() {
        return {
            type: userConnection.connectionType,
            args: _graphqlRelay.connectionArgs,
            resolve: (_, args, ctx) => {
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
                    resolve: user => {
                        // log('ql user', user);
                        return { node: user, cursor: user.id };
                    }
                },
                viewer: outputViewer
            },
            mutateAndGetPayload: (() => {
                var _ref = _asyncToGenerator(function* (userArgs, param2, param3) {
                    try {
                        log('saving user:', userArgs);
                        // log('saving param2:', param2);
                        // log('saving param3:', param3);
                        const savedUser = yield userApp.saveUser({
                            userArgs,
                            authedUser: null
                        });
                        log('saved user:', savedUser);
                        return savedUser;
                    } catch (e) {
                        log('Error saving user:', e);
                    }
                });

                return function mutateAndGetPayload(_x, _x2, _x3) {
                    return _ref.apply(this, arguments);
                };
            })()
        });
    }
    function getAuthTokenMutation(outputViewer) {
        return (0, _graphqlRelay.mutationWithClientMutationId)({
            name: 'GetAuthToken',
            inputFields: {
                userNameOrEmail: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
                password: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) }
            },
            outputFields: {
                userEdge: {
                    type: userConnection.edgeType,
                    resolve: authToken => {
                        if (authToken.user == null) return null;
                        return { node: authToken.user, cursor: authToken.user.id };
                    }
                },
                authToken: {
                    type: _graphql.GraphQLString,
                    resolve: authToken => authToken.authToken
                },
                expiresIn: {
                    type: _graphql.GraphQLInt,
                    resolve: () => expiresIn
                },
                success: {
                    type: _graphql.GraphQLBoolean,
                    resolve: authToken => authToken.authToken ? true : false
                },
                message: {
                    type: _graphql.GraphQLString,
                    resolve: authToken => authToken.authToken ? '' : 'Auth Failed, review your credentials'
                },
                errors: {
                    type: new _graphql.GraphQLList(errorType),
                    resolve: authToken => {
                        console.log(authToken.errors);
                        return authToken.errors;
                    }
                },
                viewer: outputViewer
            },
            mutateAndGetPayload: (() => {
                var _ref2 = _asyncToGenerator(function* (form, param2, param3) {
                    try {
                        log('getAuthToken input:', form);
                        const authTokenArgs = {
                            form,
                            authedUser
                        };
                        const authToken = yield userApp.getAuthToken(authTokenArgs);
                        log('getAuthToken return:', authToken);
                        return authToken;
                    } catch (e) {
                        log('Error saving user:', e);
                    }
                });

                return function mutateAndGetPayload(_x4, _x5, _x6) {
                    return _ref2.apply(this, arguments);
                };
            })()
        });
    }
    return {
        getSaveUserMutation,
        getUserConnection,
        getAuthTokenMutation
    };
}
exports.default = UserSchema;
//# sourceMappingURL=userSchema.js.map
//# sourceMappingURL=userSchema.js.map