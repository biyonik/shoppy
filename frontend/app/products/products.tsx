import { Grid } from "@mui/material";
import getProducts from "./actions/get-products";
import { ProductEntity } from "./interfaces/product.interface";
import Product from "./product";

export default async function Products() {
    const products = await getProducts();
    
    return (
        <Grid container className="mt-4" spacing={2}>
            {
                products.length > 0 ?
                (
                    products.map((product: ProductEntity) => (
                        <Grid key={product.id} size={{xs: 12, sm: 6, lg:4}}>
                            <Product product={product} />
                        </Grid>
                    ))
                ) : (
                    <h2>Any products not found!</h2>
                )
            }
        </Grid>
    )
}