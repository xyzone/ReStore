import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Product } from '../../app/models/product';
import { Typography } from '@mui/material';

type Props = {}

const ProductDetail = (props: Props) => {
  const { pid } = useParams<{ pid: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    axios.get(`http://localhost:5074/api/products/${pid}`)
      .then(response => setProduct(response.data))
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  }, [pid])
  if(loading) return <h3>Loading .... </h3>
  if(!product) return <h3>Product not found</h3>
  return (
    <Typography variant='h2'>{product.name}</Typography>
  )
}

export default ProductDetail