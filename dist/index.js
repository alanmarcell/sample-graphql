'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.log = undefined;

let createGraphqlSchema = (() => {
    var _ref = _asyncToGenerator(function* (schema) {
        const json = yield (0, _graphql.graphql)(schema, _utilities.introspectionQuery);
        const file = '/public/schema.json';
        fs.writeFile(`.${file}`, JSON.stringify(json, null, 2), function (err) {
            if (err) throw err;
            log('Json schema created!', getRunningUrl(file));
        });
        app.use('/public', _express2.default.static('public'));
    });

    return function createGraphqlSchema(_x) {
        return _ref.apply(this, arguments);
    };
})();

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

var _ptzUserApp = require('ptz-user-app');

var _ptzUserRepository = require('ptz-user-repository');

var _app = require('./prods/app');

var _repository = require('./prods/repository');

var _ptzLogFile = require('ptz-log-file');

var _ptzLogFile2 = _interopRequireDefault(_ptzLogFile);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

_dotenv2.default.config();
const log = exports.log = (0, _ptzLogFile2.default)({ dir: './logs' });
const app = (0, _express2.default)();
app.use((0, _cors2.default)());
log('starting server');
const PORT = 3012;
function getRunningUrl(path) {
    return `http://localhost:${PORT}${path}`;
}

_asyncToGenerator(function* () {
    try {
        const userApp = (0, _ptzUserApp.createApp)({
            userRepository: yield (0, _ptzUserRepository.createUserRepository)(_mongoDbUrl2.default, 'user'),
            log
        });
        const productApp = (0, _app.createApp)({
            productRepository: yield (0, _repository.createProductRepository)(_mongoDbUrl2.default, 'products'),
            log
        });
        const authedUser = {
            dtCreated: new Date(),
            ip: '0.0.0.0'
        };
        yield userApp.seed(authedUser);
        const schema = (0, _schema2.default)(userApp, productApp, authedUser, log);
        const graphqlFolder = '/graphql';
        app.use(graphqlFolder, (0, _expressGraphql2.default)({
            schema,
            graphiql: true
        }));
        yield createGraphqlSchema(schema);
        app.listen(PORT, function () {
            const url = getRunningUrl(graphqlFolder);
            log(`Running on ${url}`);
        });
    } catch (e) {
        log(e);
    }
})();
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map