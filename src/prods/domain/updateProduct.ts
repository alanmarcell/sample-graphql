import { IProduct } from './IProduct';

/**
 * Update old db product data with new product data.
 * @param oldProduct
 * @param newProduct
 */
export const updateProduct = (oldProduct: IProduct, { name,
    category,
    price
    }: IProduct): IProduct => {
    return Object.assign({}, oldProduct, {
        name,
        category,
        price,
        dtChanged: new Date()
    });
};
