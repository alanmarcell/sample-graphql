import * as V from 'ptz-validations';
const createProductValidation = {
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
export const createProduct = V.validate(createProductValidation);
//# sourceMappingURL=createProduct.js.map