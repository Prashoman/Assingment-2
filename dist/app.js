"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const product_route_1 = require("./app/modules/product/product.route");
const order_route_1 = require("./app/modules/order/order.route");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// handle syntax error in json middleware
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && 'body' in err) {
        return res.status(400).json({ error: 'Invalid JSON' });
    }
    next();
});
// product Router here
app.use('/api/', product_route_1.productRouter);
// order route here
app.use('/api/', order_route_1.OrderRoute);
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Assingnment 2 Node Js API'
    });
});
// handle route not found middleware
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});
exports.default = app;
