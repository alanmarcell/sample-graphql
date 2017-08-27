
import { emptyArray, equal, notEqual, notOk, ok } from 'ptz-assert';
import { IProductArgs } from '../domain';
import * as Core from './index';

const MONGO_URL = 'mongodb://localhost:27017/ptz-core-repo';
var productRepository;
describe('ProductRepository', () => {

    beforeEach(async () => {
        productRepository = await Core.createProductRepository(MONGO_URL, 'test-collection');
    });
    describe('getOtherProductsWithSameProductName', () => {
        it('find by name', async () => {
            const product: IProductArgs = {
                id: 'testid',
                category: 'Hardware',
                name: 'Hammer',
                price: 50
            };

            const product2: IProductArgs = {
                id: 'testid2',
                category: 'Hardware',
                name: 'Hammer',
                price: 60
            };

            await productRepository.save(product);

            const productDb = await productRepository.getOtherProductsWithSameProductName(product2);

            equal(productDb[0].name, product2.name);
            notEqual(productDb[0].id, product2.id);
        });

        it('not found', async () => {
            const product: IProductArgs = {
                id: 'testid',
                category: 'Hardware',
                name: 'dgh3t4hd@gmail.com',
                price: 50
            };

            const productDb = await productRepository.getOtherProductsWithSameProductName(product);

            emptyArray(productDb);
        });
    });

    describe('getByProductName', () => {
        it('find by name', async () => {
            const product: IProductArgs = {
                id: 'testid',
                category: 'Hardware',
                name: 'Hammer',
                price: 60
            };

            await productRepository.save(product);
            const productDb = await productRepository.getByProductName('Hammer');

            ok(productDb);
            equal(productDb.id, product.id);
            equal(productDb.category, product.category);
            equal(productDb.name, product.name);
            equal(productDb.price, product.price);
        });

        it('find by price', async () => {
            const product: IProductArgs = {
                id: 'testid',
                category: 'Hardware',
                name: 'Hammer',
                price: 60
            };

            await productRepository.save(product);
            const productDb = await productRepository.getByProductName('Hammer');

            ok(productDb);
            equal(productDb.id, product.id);
            equal(productDb.category, product.category);
            equal(productDb.name, product.name);
            equal(productDb.price, product.price);
        });

        it('not found', async () => {
            const productDb = await productRepository.getByProductName('dgdsfsfbsf');
            notOk(productDb);
        });
    });
});
