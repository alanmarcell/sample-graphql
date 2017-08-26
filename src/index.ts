import dotenv from 'dotenv';
dotenv.config();

import {
    ICreatedBy
} from '@alanmarcell/ptz-user-domain';
import cors from 'cors';
import express from 'express';
import GraphQlHttp from 'express-graphql';
import * as fs from 'fs';
import { graphql } from 'graphql';
import { introspectionQuery } from 'graphql/utilities';
import Schema from './core/schema';
import MONGO_URL from './mongoDbUrl';

import { createApp } from '@alanmarcell/ptz-user-app';
import { createUserRepository } from '@alanmarcell/ptz-user-repository';

import logFile from 'ptz-log-file';
export const log = logFile({ dir: './logs' });

const app = express();
app.use(cors());

log('starting server');

const PORT = 3012;

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
        const userApp = createApp({
            userRepository: await createUserRepository(MONGO_URL, 'user'),
            log
        });

        const authedUser: ICreatedBy = {
            dtCreated: new Date(),
            ip: '0.0.0.0'
        };

        await userApp.seed(authedUser);

        const schema = Schema(userApp, authedUser, log);

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
