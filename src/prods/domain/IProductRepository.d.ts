import { IBaseRepository } from 'ptz-core-domain';
import { IProduct } from './IProduct';

export interface IProductRepository extends IBaseRepository<IProduct> {
    getByProductName(productName: string): Promise<IProduct>;
    getOtherProductsWithSameProductName(product: IProduct): Promise<IProduct[]>;
}
