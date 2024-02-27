import { Product } from "../../app/models/product"

import { List } from "@mui/material";
import ProductCard from "./ProductCard";

interface Props {
    products: Product[];
}

export default function ProductList(props: Props) {
    return (
        <List>
            {props.products.map((product, index: number) => {
                return (
                    <ProductCard key={product.id} product={product} index={index}></ProductCard>
                )
            })}
        </List>
    )
}