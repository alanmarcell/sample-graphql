import { ok } from 'ptz-assert';
import { products } from './index';
describe('products', () => {
    it('allProducts has more than 2 test products', () => {
        ok(products.allProducts.length > 2);
    });
});
//# sourceMappingURL=products.test.js.map