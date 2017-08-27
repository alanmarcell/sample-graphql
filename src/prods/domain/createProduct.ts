import * as V from 'ptz-validations';
import { IProduct } from './IProduct';

const createProductValidation: V.IValidations = {
    id: [
        V.generateId
    ],
    name: [
        V.required,
        V.isString,
        V.min(4),
        V.max(100)
    ],
    category: [
        V.required,
        V.isString,
        V.min(4),
        V.max(100)
    ],
    price: [
        V.isNumber,
        V.min(0)
    ]
};

/**
 * Create product
 */
export const createProduct = V.validate<IProduct>(createProductValidation);
