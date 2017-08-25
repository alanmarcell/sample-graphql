import { GraphQLObjectType, GraphQLString } from 'graphql';
function AppSchema({ log }) {
    const appType = new GraphQLObjectType({
        name: 'App',
        fields: () => ({
            title: { type: GraphQLString },
            subTitle: { type: GraphQLString }
        })
    });
    return {
        appType
    };
}
export default AppSchema;
export const app = {
    title: 'Polutz',
    subTitle: 'Framework or Boilerplate?'
};
//# sourceMappingURL=appSchema.js.map