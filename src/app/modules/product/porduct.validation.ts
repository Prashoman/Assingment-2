import { z } from 'zod';

// name: string;
//     description: string;
//     price: number;
//     category: string;
//     tags: string[];
//     variants:[TVariant];
//     inventory: {
//         quantity: number;
//         inStock: boolean;
//     }

export const ProductValidation = z.object({
        name: z.string()
    });