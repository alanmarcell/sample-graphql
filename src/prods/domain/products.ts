// Products for seed and test data

import { createProduct } from './createProduct';

export const hammer = createProduct({
    name: 'Hammer',
    category: 'Hardware',
    price: 50
});

export const mobile = createProduct({
    name: 'Mobile',
    category: 'Eletronics',
    price: 1600.55
});

export const lamp = createProduct({
    name: 'lamp',
    category: 'Miscellaneous',
    price: 3.99
});

export const allProducts = [hammer, mobile, lamp];

export default allProducts;

export const products = {
    hammer,
    mobile,
    lamp,
    allProducts
};
