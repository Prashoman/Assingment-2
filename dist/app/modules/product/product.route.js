"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const route = express_1.default.Router();
route.post('/products', product_controller_1.ProductController.createAnProduct);
route.get('/products', product_controller_1.ProductController.getAllProduct);
route.get('/products/:productId', product_controller_1.ProductController.getProductById);
route.put('/products/:productId', product_controller_1.ProductController.updateProduct);
route.delete('/products/:productId', product_controller_1.ProductController.deleteProduct);
exports.productRouter = route;
