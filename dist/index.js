'use strict';

var createGraphqlSchema = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(schema) {
        var json, file;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return (0, _graphql.graphql)(schema, _utilities.introspectionQuery);

                    case 2:
                        json = _context.sent;
                        file = '/public/schema.json';

                        fs.writeFile('.' + file, JSON.stringify(json, null, 2), function (err) {
                            if (err) throw err;
                            log('Json schema created!', getRunningUrl(file));
                        });
                        app.use('/public', _express2.default.static('public'));

                    case 6:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function createGraphqlSchema(_x) {
        return _ref.apply(this, arguments);
    };
}();

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressGraphql = require('express-graphql');

var _expressGraphql2 = _interopRequireDefault(_expressGraphql);

var _fs = require('fs');

var fs = _interopRequireWildcard(_fs);

var _graphql = require('graphql');

var _utilities = require('graphql/utilities');

var _schema = require('./core/schema');

var _schema2 = _interopRequireDefault(_schema);

var _mongoDbUrl = require('./mongoDbUrl');

var _mongoDbUrl2 = _interopRequireDefault(_mongoDbUrl);

var _ptzUserApp = require('@alanmarcell/ptz-user-app');

var _ptzUserRepository = require('@alanmarcell/ptz-user-repository');

var _ptzLogFile = require('ptz-log-file');

var _ptzLogFile2 = _interopRequireDefault(_ptzLogFile);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

_dotenv2.default.config();

var log = (0, _ptzLogFile2.default)({ dir: './logs' });
var app = (0, _express2.default)();
app.use((0, _cors2.default)());
log('starting server');
var PORT = 3012;
function getRunningUrl(path) {
    return 'http://localhost:' + PORT + path;
}

_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var userApp, authedUser, schema, graphqlFolder;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
            switch (_context2.prev = _context2.next) {
                case 0:
                    _context2.prev = 0;
                    _context2.t0 = _ptzUserApp.createApp;
                    _context2.next = 4;
                    return (0, _ptzUserRepository.createUserRepository)(_mongoDbUrl2.default, 'user');

                case 4:
                    _context2.t1 = _context2.sent;
                    _context2.t2 = log;
                    _context2.t3 = {
                        userRepository: _context2.t1,
                        log: _context2.t2
                    };
                    userApp = (0, _context2.t0)(_context2.t3);
                    authedUser = {
                        dtCreated: new Date(),
                        ip: '0.0.0.0'
                    };
                    _context2.next = 11;
                    return userApp.seed(authedUser);

                case 11:
                    schema = (0, _schema2.default)(userApp, authedUser, log);
                    graphqlFolder = '/graphql';

                    app.use(graphqlFolder, (0, _expressGraphql2.default)({
                        schema: schema,
                        graphiql: true
                    }));
                    _context2.next = 16;
                    return createGraphqlSchema(schema);

                case 16:
                    app.listen(PORT, function () {
                        var url = getRunningUrl(graphqlFolder);
                        log('Running on ' + url);
                    });
                    _context2.next = 22;
                    break;

                case 19:
                    _context2.prev = 19;
                    _context2.t4 = _context2['catch'](0);

                    log(_context2.t4);

                case 22:
                case 'end':
                    return _context2.stop();
            }
        }
    }, _callee2, undefined, [[0, 19]]);
}))();
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map