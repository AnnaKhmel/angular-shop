import { ProductOption } from "./product-option";

export interface Product {
    id: number;
    name: string;
    price: number;
    material: string;
    options: ProductOption[];
}
