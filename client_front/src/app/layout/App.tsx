import { useEffect, useState } from "react"
import { Product } from "../models/product";
import Catalog from "../../features/catalog/Catalog";
import { Typography } from "@mui/material";


function App() {
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
    <div className="app">
      <Typography variant="h1">ReStore</Typography>
      <Catalog products={products} addProducts={addProducts} />

    </div>
  )
}
export default App
