import { GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';
function MenuSchema({ log }) {
    const menuItemType = new GraphQLObjectType({
        name: 'MenuItem',
        fields: () => ({
            label: { type: GraphQLString },
            link: { type: GraphQLString },
            role: { type: GraphQLString },
            subItems: { type: new GraphQLList(menuItemType) }
        })
    });
    const menuType = new GraphQLObjectType({
        name: 'Menu',
        fields: () => ({
            label: { type: GraphQLString },
            items: { type: new GraphQLList(menuItemType) }
        })
    });
    return {
        menuItemType,
        menuType
    };
}
export default MenuSchema;
export const menu = {
    label: 'Menu',
    items: [
        { label: 'Home', link: '/' },
        { label: 'Github', link: 'https://github.com/polutz/polutz' },
        { label: 'About Us', link: '/aboutus' },
        { label: 'Contact', link: '/contact' },
        { label: 'Faq', link: '/faq' },
        { label: 'Log In', link: '/users/login' },
        { label: 'Sign Up', link: '/users/signup' },
        {
            label: 'Users',
            subItems: [
                { label: 'User Report', link: '/users/report', role: 'USERS_VIEW' }
            ]
        }
    ]
};
//# sourceMappingURL=menuSchema.js.map