import { ChangeEvent, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'; 
import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from '@mui/material';
 
import NotFound from '../../app/errors/NotFound';
import LoadingComponent from '../../app/layout/LoadingComponent'; 
import { LoadingButton } from '@mui/lab';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { addBasketItemAsync, removeBasketItemAsync, setBasket } from '../basket/BasketSlice';
import { fetchProductAsync, productSelectors } from './catalogSlice';
 

const ProductDetail = () => {  
  const {basket} = useAppSelector(state=>state.basket);
  const dispatch = useAppDispatch();
  const {status: productStatus} = useAppSelector(state=>state.catalog);
  const { pid } = useParams<{ pid: string }>(); 
  const product = useAppSelector(state => productSelectors.selectById(state, parseInt(pid!))) 
  const [quantity, setQuantity] = useState(0)
  const item  = basket?.items.find((i) => {return i.productId == product?.id})

  useEffect(() => { 
    if(item ){ 
      setQuantity(item.quantity);
    }
    if(!product && pid)dispatch(fetchProductAsync(parseInt(pid)))
  }, [pid, item, dispatch])

  function handleInput(event:ChangeEvent<HTMLInputElement>){
    console.log('change', parseInt(event.currentTarget.value));
    if (parseInt(event.currentTarget.value)  >= 0)  
    setQuantity(parseInt(event.currentTarget.value));
  }

  function handleUpdateQty(event:any){
    if (!product) return;
     
    if (!item || item.quantity < quantity){
      const updatedQty = item ? quantity - item.quantity : quantity
      dispatch(addBasketItemAsync({productId: product.id, qty: updatedQty}))
    }else{ 
       const updateQty = item.quantity - quantity;
       dispatch(removeBasketItemAsync({productId: product.id, qty: updateQty}))
    } 
  }
 

  if(productStatus.includes('pending')) return <LoadingComponent message='loading product'></LoadingComponent>
  if(!product) return <NotFound></NotFound>
  return (
     <Grid container spacing={6}>
      <Grid item xs={6}>
        <img src={product.pictureUrl} alt={product.name} style={{width: '109%'}}></img>
        
      </Grid>
      <Grid item xs={6}>
          <Typography variant='h3'>{product.name}</Typography>
          <Divider sx={{mb: 2}}/>
          <Typography variant='h4' color='secondary'>${(product.price / 100).toFixed(2)}</Typography>
          <TableContainer>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>{product.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Description</TableCell>
                  <TableCell>{product.description}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Type</TableCell>
                  <TableCell>{product.type}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Brand</TableCell>
                  <TableCell>{product.brand}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Qty</TableCell>
                  <TableCell>{product.quantityInStock}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField onChange={handleInput} variant='outlined' type='number' label='Qty in Cart'
               value={quantity ?? 0}> 

              </TextField>
            </Grid>
            <Grid item xs={6}> 
              <LoadingButton disabled={item?.quantity == quantity || !item && quantity == 0} 
              onClick={handleUpdateQty}  sx={{height: "55px"}} size='large' color='primary' variant='contained' fullWidth>
                {item ? 'Update qty' : 'Add to Cart'}
              </LoadingButton>
            </Grid>

          </Grid>
          </Grid>
     </Grid>
  )
}

export default ProductDetail