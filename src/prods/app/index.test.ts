import { ok } from 'ptz-assert';
import * as Core from './index';

describe('ptz-product-app', () => {
    describe('exports', () => {
        it('createApp', () => ok(Core.createApp));
        it('deleteProduct', () => ok(Core.deleteProduct));
    });
});
