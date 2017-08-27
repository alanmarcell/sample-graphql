import { IUserApp } from '@alanmarcell/ptz-user-domain';
import {
    GraphQLObjectType,
    GraphQLSchema
} from 'graphql';
import { globalIdField } from 'graphql-relay';
import { ILog } from 'ptz-log';
import { IProductApp } from '../prods/domain';
import ProdsSchema from '../prods/prodsSchema';
import UserSchema from '../users/userSchema';

function Schema(userApp: IUserApp, productApp: IProductApp, authedUser, log: ILog) {

    const userSchema = UserSchema({ userApp, authedUser, log });
    const prodsSchema = ProdsSchema({ productApp, authedUser, log });

    const viewer = {};

    const viewerType = new GraphQLObjectType({
        name: 'Viewer',
        fields: () => ({
            id: globalIdField('Viewer'),
            userConnection: userSchema.getUserConnection(),
            prods: prodsSchema.getProds()
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
                getAuthToken: userSchema.getAuthTokenMutation(outputViewer),
                saveProd: prodsSchema.getSaveProdMutation(),
            })
        })
    });

    return schema;
}

export default Schema;
