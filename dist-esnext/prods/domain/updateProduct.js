/**
 * Update old db product data with new product data.
 * @param oldProduct
 * @param newProduct
 */
export const updateProduct = (oldProduct, { name, category, price }) => {
    return Object.assign({}, oldProduct, {
        name,
        category,
        price,
        dtChanged: new Date()
    });
};
//# sourceMappingURL=updateProduct.js.map