import { find, getById, getByIds, getDb, getDbCollection, save } from '@alanmarcell/ptz-core-repository';
import R from 'ramda';
export const createProductRepository = R.curry(async (url, collectionName) => {
    const db = await getDb(url);
    const collection = getDbCollection(db, collectionName);
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
const getOtherProductsWithSameProductName = R.curry((collection, product) => {
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
const getByProductName = R.curry((collection, productName) => {
    const query = {
        $or: [{ name: productName }]
    };
    return collection
        .findOne(query);
});
export { getByProductName, getOtherProductsWithSameProductName };
//# sourceMappingURL=productRepository.js.map