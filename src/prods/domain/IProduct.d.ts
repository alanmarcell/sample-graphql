import { IEntityBase, IEntityBaseArgs } from './IEntityBase';

export interface IProduct extends IEntityBase {
    name: string;
    price: number;
    category: string;
}

export interface IProductArgs extends IEntityBaseArgs {
    name: string;
    price: number;
    category: string;
}

export interface IProductForLog {
    id: string;
    name: string;
    price: number;
    category: string;
}
