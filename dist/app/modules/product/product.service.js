"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const product_model_1 = require("./product.model");
// create product
const createProduct_DB = (product) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.create(product);
    return result;
});
// get all product
const getAllProduct_DB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.find();
    return result;
});
// get prduct by id
const getProductById_DB = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findById(productId);
    return result;
});
// update Product by id
const updateProductById_DB = (productId, product) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.updateOne({
        _id: productId
    }, product);
    return result;
});
// delete product by id
const deleteProductById_DB = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.deleteOne({ _id: productId });
    return result;
});
// search product using the queary parmitter search
const searchProduct_DB = (search) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.find({
        $or: [
            { name: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
            { category: { $regex: search, $options: 'i' } },
            { tags: { $regex: search, $options: 'i' } },
            { variants: { $elemMatch: { type: { $regex: search, $options: 'i' } } } },
        ]
    });
    return result;
});
exports.ProductService = {
    createProduct_DB,
    getAllProduct_DB,
    getProductById_DB,
    updateProductById_DB,
    deleteProductById_DB,
    searchProduct_DB
};
