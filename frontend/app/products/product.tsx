import { Card, Stack, Typography } from "@mui/material";
import { ProductEntity } from "./interfaces/product.interface";
import Image from "next/image";
import { API_URL } from "@/common/constants/api";

interface ProductProps {
  product: ProductEntity;
}

export default function Product({ product }: ProductProps) {
  return (
    <Card className="p-4">
      <Stack gap={3}>
        <Typography variant="h4">{product.name}</Typography>
        {product.imageExists && (
          <Image
            src={`${API_URL}/products/${product.id}.jpg`}
            width="0"
            height="0"
            alt={product.name}
            className="w-full h-auto"
            sizes="100vw"
          />
        )}
        <Typography>{product.description}</Typography>
        <Typography>${product.price}</Typography>
      </Stack>
    </Card>
  );
}
