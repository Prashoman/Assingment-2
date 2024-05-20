import { TProduct } from "./product.interface";
import { Product } from "./product.model";


const createProduct_DB = async(product:TProduct)=>{
    const result = await Product.create(product);
    return result;
}


export const ProductService ={
    createProduct_DB
}