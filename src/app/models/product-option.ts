export enum Gender {
    men = 'men',
    women = 'women',
    unisex = 'unisex adults',
    boys = 'boys',
    girls = 'girls'
}

export interface ProductOption {
    productId: number;
    size: string;
    color: string;
    gender: Gender;
}
