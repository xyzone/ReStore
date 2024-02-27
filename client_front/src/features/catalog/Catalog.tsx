import { Fragment } from "react"

import { Product } from "../../app/models/product";
import { Button } from "@mui/material";
import ProductList from "./ProductList";

interface Props {
    products: Product[];
    addProducts: () => void;
}

export default function Catalog(props: Props) {
    return (
        <Fragment>
            <ProductList products={props.products} />
            <Button variant="contained" onClick={props.addProducts}>Add Product</Button>
        </Fragment>
    )
}