import { IUserApp } from '@alanmarcell/ptz-user-domain';

import MenuSchema, { menu } from '../menus/menuSchema';
import UserSchema from '../users/userSchema';
import AppSchema, { app } from './appSchema';

import {
    GraphQLObjectType,
    GraphQLSchema
} from 'graphql';

import {
    globalIdField
} from 'graphql-relay';

import { ILog } from 'ptz-log';

function Schema(userApp: IUserApp, authedUser, log: ILog) {

    const appSchema = AppSchema({ log });
    const menuSchema = MenuSchema({ log });
    const userSchema = UserSchema({ userApp, authedUser, log });

    const viewer = {};

    const viewerType = new GraphQLObjectType({
        name: 'Viewer',
        fields: () => ({
            id: globalIdField('Viewer'),
            app: { type: appSchema.appType, resolve: () => app },
            menu: { type: menuSchema.menuType, resolve: () => menu },
            userConnection: userSchema.getUserConnection()
        })
    });

    const outputViewer = {
        type: viewerType,
        resolve: () => viewer
    };

    const schema = new GraphQLSchema({
        query: new GraphQLObjectType({
            name: 'Query',
            fields: () => ({
                viewer: {
                    type: viewerType,
                    resolve: () => viewer
                }
            })
        }),

        mutation: new GraphQLObjectType({
            name: 'Mutation',
            fields: () => ({
                saveUser: userSchema.getSaveUserMutation(outputViewer),
                getAuthToken: userSchema.getAuthTokenMutation(outputViewer)
            })
        })
    });

    return schema;
}

export default Schema;
