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
exports.OrderController = void 0;
const order_service_1 = require("./order.service");
const order_validation_1 = require("./order.validation");
const product_service_1 = require("../product/product.service");
// createOrder medthod with quantity validation
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = req.body;
        const orderValidation = order_validation_1.OrderValidation.parse(order);
        // fetch data by productId
        const product = yield product_service_1.ProductService.getProductById_DB(orderValidation.productId);
        if (!product) {
            return res.status(400).json({
                success: false,
                message: "Product not found"
            });
        }
        // check quantity available in inventory
        if (product.inventory.quantity < orderValidation.quantity) {
            return res.status(400).json({
                success: false,
                message: "Insufficient quantity available in inventory"
            });
        }
        const quantityProduct = product.inventory.quantity - orderValidation.quantity;
        // check product quantity and set inStock false if quantity is less than equal 0
        if (quantityProduct <= 0) {
            product.inventory.inStock = false;
        }
        product.inventory.quantity = quantityProduct;
        yield product.save();
        const result = yield order_service_1.OrderService.orderCreate_DB(orderValidation);
        if (!result) {
            return res.status(400).json({
                success: false,
                message: "Order not created"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Order created successfully!",
            date: result
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Order Not Created! Internal Server Error!",
            error: error
        });
    }
});
const getAllOreder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.query.email;
        // fetch all orders by email query
        if (email) {
            const result = yield order_service_1.OrderService.orderGetAllByEmail_DB(email);
            if (!result) {
                return res.status(400).json({
                    success: false,
                    message: "Order Not Found"
                });
            }
            return res.status(200).json({
                success: true,
                message: "Orders fetched successfully!",
                data: result
            });
        }
        const result = yield order_service_1.OrderService.orderGetAll_DB();
        if (!result) {
            return res.status(400).json({
                success: false,
                message: "Order Not Found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Orders fetched successfully!",
            data: result
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Order Not Found! Internal Server Error!",
            error: error
        });
    }
});
exports.OrderController = {
    createOrder,
    getAllOreder
};
