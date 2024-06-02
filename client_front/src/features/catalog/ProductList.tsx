import { Product } from "../../app/models/product"

import { Grid } from "@mui/material";
import ProductCard from "./ProductCard";

interface Props {
    products: Product[];
}

export default function ProductList(props: Props) {
    return (
        <>
            <Grid container spacing={5}>

                {props.products.map((product, index: number) => {
                    return (
                        <Grid item xs={3} key={product.id}>
                            <ProductCard  product={product} index={index}></ProductCard>
                        </Grid>
                    )
                })}

            </Grid>
        </>
    )
}