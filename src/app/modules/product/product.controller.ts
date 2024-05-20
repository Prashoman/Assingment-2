import { Request, Response } from "express";
import { ProductService } from "./product.service";

import { productValidationSchema } from "./porduct.validation";



const createAnProduct = async (req:Request,res:Response)=>{
    try {
        const product = req.body;
        const productValidationZodData = productValidationSchema.parse(product);
        const newProduct = await ProductService.createProduct_DB(productValidationZodData);
        if(!newProduct){
           return res.status(400).json({
            message:"Product not created",
            success:false
            });
        }
        return res.status(200).json({
            message:"Product created successfully!",
            success:true,
            data:newProduct
        });
    } catch (error) {
        //  console.log(error);
        
        return res.status(500).json({
            message:"Internal Server Error",
            success:false,
            error:error
        });
    }
}

export const ProductController ={
    createAnProduct
}