import { Collection } from 'mongodb';
import { find, getById, getByIds, getDb, getDbCollection, save } from 'ptz-core-repository';
import R from 'ramda';
import { IProduct, IProductArgs, IProductRepository } from '../domain';
type ICreateRepository = (url: string, collectionName: string) => Promise<IProductRepository>;

export const createProductRepository: ICreateRepository = R.curry(async (url: string, collectionName: string) => {
    const db = await getDb(url);
    const collection = getDbCollection<IProduct>(db, collectionName);
    return {
        db,
        collectionName,
        save: save(collection),
        getByIds: getByIds(collection),
        find: find(collection),
        getById: getById(collection),
        getDbCollection: () => collection,
        getOtherProductsWithSameProductName: getOtherProductsWithSameProductName(collection),
        getByProductName: getByProductName(collection)
    };
});

const getOtherProductsWithSameProductName = R.curry(
    (collection: Collection, product: IProductArgs): Promise<IProduct[]> => {
        const query = {
            _id: { $ne: product.id },
            $or: [
                { name: product.name }
            ]
        };

        const select = {
            name: 1
        };

        return collection
            .find(query, select)
            .toArray();
    });

const getByProductName = R.curry((collection: Collection, productName: string): Promise<IProduct> => {
    const query = {
        $or: [{ name: productName }]
    };

    return collection
        .findOne(query);
});

export { getByProductName, getOtherProductsWithSameProductName };
