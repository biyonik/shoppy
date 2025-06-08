export interface ProductEntity {
    id: string;
    name: string;
    description?: string;
    price: number;
    imageExists: boolean;
}