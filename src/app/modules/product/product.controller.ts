import { Request, Response } from "express";
import { ProductService } from "./product.service";


const createAnProduct = async (req:Request,res:Response)=>{
    try {
        const product = req.body;
        const newProduct = await ProductService.createProduct_DB(product);
        if(!newProduct){
           return res.status(400).json({
            message:"Product not created",
            success:false
            });
        }
        return res.status(200).json({
            message:"Products fetched successfully!",
            success:true,
            data:newProduct
        });
    } catch (error) {
        return res.status(500).json({
            message:"Internal Server Error",
            success:false
        });
    }
}

export const ProductController ={
    createAnProduct
}