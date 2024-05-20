import express  from "express";
import { ProductController } from "./product.controller";


const route = express.Router();

route.post('/products', ProductController.createAnProduct);

export const productRouter = route;