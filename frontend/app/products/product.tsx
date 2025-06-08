import { Card, Typography } from "@mui/material";
import { ProductEntity } from "./interfaces/product.interface";

interface ProductProps {
    product: ProductEntity
}

export default function Product({product}: ProductProps) {
    return (
        <Card className="p-4">
            <Typography variant="h4">{product.name}</Typography>
            <Typography>{product.description}</Typography>
            <Typography>${product.price}</Typography>
        </Card>
    )
}