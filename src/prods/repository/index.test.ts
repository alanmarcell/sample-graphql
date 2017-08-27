import { ok } from 'ptz-assert';
import * as Core from './index';

describe('ptz-product-repository', () => {
    describe('exports', () => {
        it('getOtherProductsWithSameProductName', () => ok(Core.getOtherProductsWithSameProductName));
    });
});
