import axios from 'axios';
import { GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { connectionArgs, connectionDefinitions, connectionFromPromisedArray, mutationWithClientMutationId } from 'graphql-relay';
import R from 'ramda';
async function _getProds(log) {
    const res = [];
    await axios({
        method: 'get',
        url: 'http://localhost:3010/api/products'
    }).then((response) => {
        res.push(response.data);
    });
    // await axios({
    //     method: 'get',
    //     url: 'http://localhost:3030/api/products'
    // }).then((response) => {
    //     res.push(response.data);
    // });
    return (R.flatten(res));
}
async function save({ prodArgs, createdBy, log }) {
    const res = [];
    log(prodArgs);
    await axios({
        method: 'post',
        url: 'http://localhost:3010/api/product',
        data: prodArgs
    }).then((response) => {
        log('prodArgs', prodArgs);
        res.push(response.data);
    });
    // await axios({
    //     method: 'get',
    //     url: 'http://localhost:3030/api/products'
    // }).then((response) => {
    //     res.push(response.data);
    // });
    return (R.flatten(res));
}
const prodApp = {
    save
};
function ProdsSchema(log) {
    const prodsType = new GraphQLObjectType({
        name: 'Prods',
        fields: () => ({
            _id: { type: GraphQLString },
            name: { type: GraphQLString },
            price: { type: GraphQLInt },
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
                return connectionFromPromisedArray(_getProds(log), args);
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
            mutateAndGetPayload: async (prodArgs, param2, param3) => {
                try {
                    log('saving prod:', prodArgs);
                    log('saving param2:', param2);
                    log('saving param3:', param3);
                    const savedProd = await prodApp.save({
                        prodArgs,
                        createdBy: null,
                        log
                    });
                    log('saved prod:', savedProd);
                    return savedProd;
                }
                catch (e) {
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
//# sourceMappingURL=prodsSchema.js.map