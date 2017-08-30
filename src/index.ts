import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
import express from 'express';
import GraphQlHttp from 'express-graphql';
import * as fs from 'fs';
import { graphql } from 'graphql';
import { introspectionQuery } from 'graphql/utilities';
import {
    ICreatedBy
} from 'ptz-user-domain';
import Schema from './core/schema';
import MONGO_URL from './mongoDbUrl';

import { createApp as createUserApp } from 'ptz-user-app';
import { createUserRepository } from 'ptz-user-repository';

import { createApp as createProductApp } from './prods/app';
import { createProductRepository } from './prods/repository';

import logFile from 'ptz-log-file';
export const log = logFile({ dir: './logs' });

const app = express();
app.use(cors());

log('starting server');

const PORT = 8080;

function getRunningUrl(path) {
    return `http://localhost:${PORT}${path}`;
}

async function createGraphqlSchema(schema) {
    const json = await graphql(schema, introspectionQuery);
    const file = '/public/schema.json';
    fs.writeFile(`.${file}`, JSON.stringify(json, null, 2), err => {
        if (err) throw err;

        log('Json schema created!', getRunningUrl(file));
    });

    app.use('/public', express.static('public'));
}

(async () => {
    try {
        const userApp = createUserApp({
            userRepository: await createUserRepository(MONGO_URL, 'user'),
            log
        });

        const productApp = createProductApp({
            productRepository: await createProductRepository(MONGO_URL, 'products'),
            log
        });

        const authedUser: ICreatedBy = {
            dtCreated: new Date(),
            ip: '0.0.0.0'
        };

        await userApp.seed(authedUser);

        const schema = Schema(userApp, productApp, authedUser, log);

        const graphqlFolder = '/graphql';
        app.use(graphqlFolder, GraphQlHttp({
            schema,
            graphiql: true
        }));

        await createGraphqlSchema(schema);

        app.listen(PORT, () => {
            const url = getRunningUrl(graphqlFolder);
            log(`Running on ${url}`);
        });
    } catch (e) {
        log(e);
    }
})();
