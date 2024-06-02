import { Box, Button, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Add, Delete, InsertEmoticon, Remove } from "@mui/icons-material"; 
import agent from "../../app/api/agent";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import BasketSummary from "./BasketSummary";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync, removeBasketItemAsync, setBasket } from "./BasketSlice";
 

export default function BasketPage() { 
    const dispatch = useAppDispatch()
    const {basket, status} = useAppSelector(state => state.basket)
    

    if (!basket || !basket.items) return <Typography variant="h3">No Basket</Typography>


    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Product</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="center">Quantity</TableCell>
                            <TableCell align="right">Subtotal</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {basket.items.map((row) => (
                            <TableRow
                                key={row.productId}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <Box display={'flex'} alignItems='center'>
                                        <img src={row.pictureUrl} alt={row.name} style={{ height: 50, marginRight: 20 }}></img>
                                        <span>
                                            {row.name}
                                        </span>
                                    </Box>
                                </TableCell>
                                <TableCell align="right">{(row.price / 100).toFixed(2)}</TableCell>
                                <TableCell align="center">
                                    <LoadingButton loading={ status === ('pendingRemoveItem' + row.productId + 'rem')} color="error"
                                        onClick={() => dispatch(removeBasketItemAsync({productId: row.productId, qty: 1, name: 'rem'}))}>
                                        <Remove />
                                    </LoadingButton> 
                                    {row.quantity}
                                    <LoadingButton loading={ status === ('pendingAddItem' + row.productId)}  color="secondary"
                                        onClick={() => dispatch(addBasketItemAsync({productId: row.productId}))}>
                                        <Add />
                                    </LoadingButton>
                                </TableCell>
                                <TableCell align="right">{((row.price / 100) * row.quantity).toFixed(2)}</TableCell>
                                <TableCell align="right">
                                    <LoadingButton loading={ status === ('pendingRemoveItem' + row.productId + 'del')}
                                        color="secondary" onClick={() =>  dispatch(removeBasketItemAsync({productId: row.productId, qty: row.quantity, name: 'del'}))}>
                                        <Delete />
                                    </LoadingButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Grid container>
                <Grid item xs={6}></Grid>
                <Grid item xs={6}><BasketSummary></BasketSummary>
                    <Button component={Link} to='/checkout' variant='contained' size='large' fullWidth>Checkout</Button>
                </Grid>
            </Grid>
        </>


    )
}