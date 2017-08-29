import { ICreatedBy } from 'ptz-user-domain';
import * as V from 'ptz-validations';
import {
    createProduct,
    IDeleteProductArgs,
    IFindProductsArgs,
    IProduct,
    IProductApp,
    IProductAppArgs,
    IProductRepository,
    ISaveProductArgs,
    products as productsToSeed,
    updateProduct as updateProductFunc
} from '../domain';

import R from 'ramda';

export const createApp = (productAppArgs: IProductAppArgs): IProductApp => {
    const productRepository = productAppArgs.productRepository;
    return {
        saveProduct: saveProduct({
            productRepository,
            updateProduct: updateProductFunc,
        }
        ),
        findProducts: findProducts(productRepository.find),
        deleteProduct,
        seed
    };
};

export const saveProduct =
    R.curry(
        async (
            func: {
                productRepository: IProductRepository,
                updateProduct?: (dbProduct: IProduct, product: IProduct) => IProduct
            },
            args: ISaveProductArgs): Promise<IProduct> => {
            args.productArgs.createdBy = args.authedUser;

            var product = createProduct(args.productArgs);

            if (!V.isValid(product)) return Promise.resolve(product);

            const productDb = await func.productRepository.getById(product.id);

            if (productDb) product = func.updateProduct(productDb, product);

            product = await func.productRepository.save(product);

            return Promise.resolve(product);
        }
    );

// tslint:disable-next-line:max-line-length
export const findProducts =
    R.curry(async (find: (query: any, options: { limit: number }) => Promise<IProduct[]>, args: IFindProductsArgs) =>
        find(args.query, { limit: args.options.limit }));

export const seed = R.curry((productRepository: IProductRepository, authedUser: ICreatedBy) => {

    const products: IProduct[] = productsToSeed.allProducts;

    products.map(async product => await saveProduct(
        { productRepository }, { productArgs: product, authedUser }));

    return Promise.resolve(true);
});

export const deleteProduct = (args: IDeleteProductArgs): Promise<boolean> => {
    return Promise.resolve(false);
};
