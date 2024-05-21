"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderValidation = void 0;
const zod_1 = require("zod");
exports.OrderValidation = zod_1.z.object({
    email: zod_1.z.string({
        required_error: "Email is required."
    }).email("Invalid email address."),
    productId: zod_1.z.string({
        required_error: "Product ID is required."
    }),
    price: zod_1.z.number({
        required_error: "Price is required."
    }).positive("Price must be a positive number."),
    quantity: zod_1.z.number({
        required_error: "Quantity is required."
    }).positive("Quantity must be a positive number.")
});
