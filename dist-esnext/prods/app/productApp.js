import * as V from 'ptz-validations';
import { createProduct, products as productsToSeed, updateProduct as updateProductFunc } from '../domain';
import R from 'ramda';
export const createApp = (productAppArgs) => {
    const productRepository = productAppArgs.productRepository;
    return {
        saveProduct: saveProduct({
            productRepository,
            updateProduct: updateProductFunc,
        }),
        findProducts: findProducts(productRepository.find),
        deleteProduct,
        seed
    };
};
export const saveProduct = R.curry(async (func, args) => {
    args.productArgs.createdBy = args.authedUser;
    var product = createProduct(args.productArgs);
    if (!V.isValid(product))
        return Promise.resolve(product);
    const productDb = await func.productRepository.getById(product.id);
    if (productDb)
        product = func.updateProduct(productDb, product);
    product = await func.productRepository.save(product);
    return Promise.resolve(product);
});
// tslint:disable-next-line:max-line-length
export const findProducts = R.curry(async (find, args) => find(args.query, { limit: args.options.limit }));
export const seed = R.curry((productRepository, authedUser) => {
    const products = productsToSeed.allProducts;
    products.map(async (product) => await saveProduct({ productRepository }, { productArgs: product, authedUser }));
    return Promise.resolve(true);
});
export const deleteProduct = (args) => {
    return Promise.resolve(false);
};
//# sourceMappingURL=productApp.js.map