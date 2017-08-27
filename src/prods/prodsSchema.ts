import { ICreatedBy } from '@alanmarcell/ptz-user-domain';
import {
    GraphQLFloat,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString
} from 'graphql';
import {
    connectionArgs,
    connectionDefinitions,
    connectionFromPromisedArray,
    mutationWithClientMutationId
} from 'graphql-relay';
import { ILog } from 'ptz-log';
import { IProductApp } from './domain';

interface IProductSchemaArgs {
    productApp: IProductApp;
    authedUser: ICreatedBy;
    log: ILog;
}

function ProdsSchema({ productApp, authedUser, log }: IProductSchemaArgs) {

    const prodsType = new GraphQLObjectType({
        name: 'Prods',
        fields: () => ({
            _id: { type: GraphQLString },
            name: { type: GraphQLString },
            price: { type: GraphQLFloat },
            category: { type: GraphQLString }
        })
    });

    const prodsConnection = connectionDefinitions({
        name: 'Prods',
        nodeType: prodsType
    });

    function getProds() {
        return {
            type: prodsConnection.connectionType,
            args: connectionArgs,
            resolve: (_, args, ctx) => {
                log('getting prods');
                return connectionFromPromisedArray(
                    productApp.findProducts({
                        query: {},
                        options: { limit: args.first },
                        authedUser: ctx.createdBy
                    }),
                    args
                );
            }
        };
    }

    function getSaveProdMutation() {

        return mutationWithClientMutationId({
            name: 'SaveProd',

            inputFields: {
                id: { type: GraphQLString },
                prodName: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
                displayName: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) },
                errors: { type: new GraphQLList(GraphQLString) }
            },

            outputFields: {
                prodEdge: {
                    type: prodsConnection.edgeType,
                    resolve: (prod) => {
                        log('ql prod', prod);
                        return { node: prod, cursor: prod.id };
                    }
                }
            },

            mutateAndGetPayload: async (productArgs, param2, param3) => {
                try {
                    log('saving prod:', productArgs);
                    log('saving param2:', param2);
                    log('saving param3:', param3);

                    const savedProduct = await productApp.saveProduct({
                        productArgs,
                        authedUser: null
                    });
                    log('saved product:', savedProduct);
                    return savedProduct;
                } catch (e) {
                    log('Error saving prod:', e);
                }
            }
        });
    }

    return {
        getProds,
        getSaveProdMutation
    };
}

export default ProdsSchema;
