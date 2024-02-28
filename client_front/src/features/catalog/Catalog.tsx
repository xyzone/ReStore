import { Fragment, useEffect, useState } from "react"

import { Product } from "../../app/models/product";
import { Button } from "@mui/material";
import ProductList from "./ProductList";

interface Props {

}

export default function Catalog(props: Props) {
    const [products, setProducts3] = useState<Product[]>([]);

  useEffect(() => {
    fetch('http://localhost:5074/api/products')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        return setProducts3(data)
      })
  }, [])

  function addProducts() {
    setProducts3(prevProduct => [...prevProduct,
    {
      id: 10,
      name: '005 ' + prevProduct.length,
      price: prevProduct.length,
      brand: 'test',
      description: 'test',
      pictureUrl: ''
    }])
  }

    return (
        <Fragment>
            <ProductList products={products} />
            <Button variant="contained" onClick={addProducts}>Add Product</Button>
        </Fragment>
    )
}