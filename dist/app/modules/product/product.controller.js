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
exports.ProductController = void 0;
const product_service_1 = require("./product.service");
const porduct_validation_1 = require("./porduct.validation");
// createAnProduct medthod
const createAnProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = req.body;
        // check validation of product data using zod validation schema
        const productValidationZodData = porduct_validation_1.productValidationSchema.parse(product);
        const newProduct = yield product_service_1.ProductService.createProduct_DB(productValidationZodData);
        if (!newProduct) {
            return res.status(400).json({
                message: "Product not created",
                success: false
            });
        }
        return res.status(200).json({
            message: "Product created successfully!",
            success: true,
            data: newProduct
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: error
        });
    }
});
// get all product method
const getAllProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { searchTerm } = req.query;
        // its true is searchTerm query url
        if (searchTerm) {
            const result = yield product_service_1.ProductService.searchProduct_DB(searchTerm);
            if (!result) {
                return res.status(400).json({
                    message: "No Product Found",
                    success: false
                });
            }
            return res.status(200).json({
                success: true,
                message: "Products fetched successfully!",
                data: result
            });
        }
        const result = yield product_service_1.ProductService.getAllProduct_DB();
        if (!result) {
            return res.status(400).json({
                message: "No Product Found",
                success: false
            });
        }
        return res.status(200).json({
            success: true,
            message: "Products fetched successfully!",
            data: result
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Product not found Server Error",
            success: false,
            error: error
        });
    }
});
// get single product method
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield product_service_1.ProductService.getProductById_DB(productId);
        if (!result) {
            return res.status(400).json({
                message: "No Product Found",
                success: false
            });
        }
        return res.status(200).json({
            success: true,
            message: "Product fetched successfully!",
            data: result
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Product not found.Internal Server Error",
            success: false,
            error: error
        });
    }
});
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const product = req.body;
        const productValidationZodData = porduct_validation_1.productValidationSchema.parse(product);
        const updatedProduct = yield product_service_1.ProductService.updateProductById_DB(productId, productValidationZodData);
        if (!updatedProduct) {
            return res.status(400).json({
                success: false,
                message: "Product cannot be updated",
            });
        }
        const result = yield product_service_1.ProductService.getProductById_DB(productId);
        if (!result) {
            return res.status(400).json({
                message: "No Product Found",
                success: false,
            });
        }
        return res.status(200).json({
            success: true,
            message: "Product updated successfully!",
            data: result,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Product not found.Internal Server Error",
            success: false,
            error: error,
        });
    }
});
// delete product method
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield product_service_1.ProductService.deleteProductById_DB(productId);
        if (!result) {
            return res.status(400).json({
                success: false,
                message: "No Product Found",
            });
        }
        const product = yield product_service_1.ProductService.getProductById_DB(productId);
        if (!product) {
            return res.status(200).json({
                success: true,
                message: "Product deleted successfully!",
                data: product
            });
        }
        return res.status(400).json({
            success: false,
            message: "No Product Found",
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Product not found.Internal Server Error",
            success: false,
            error: error
        });
    }
});
exports.ProductController = {
    createAnProduct,
    getAllProduct,
    getProductById,
    updateProduct,
    deleteProduct,
};
