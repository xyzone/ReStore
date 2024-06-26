import { Link } from "react-router-dom";
import { Product } from "../../app/models/product";
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { useState } from "react";
import { LoadingButton } from '@mui/lab';
import agent from "../../app/api/agent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync, setBasket } from "../basket/BasketSlice";
 


interface Props {
    product: Product,
    index: number
}

export default function ProductCard({ product }: Props) {
    const {status} = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();
 

    return (<>
        <Card>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: 'secondary.main' }}>
                        {product.name.charAt(0).toUpperCase()}

                    </Avatar>

                }
                title={product.name}
                titleTypographyProps={{
                    sx: { fontWeight: 'bold', color: 'primary.main' }
                }}
            >
            </CardHeader>
            <CardMedia
                sx={{ height: 140, backgroundSize: 'contain', bgcolor: 'primary.light' }}
                image={product.pictureUrl}
                title={product.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" color='secondary' component="div">
                    ${(product.price / 100).toFixed(2)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.brand} / {product.type}
                </Typography>
            </CardContent>
            <CardActions>
                <LoadingButton loading={status.includes('pending')} onClick={() => dispatch(addBasketItemAsync({productId: product.id}))} size="small">Add to Card</LoadingButton>
                <Button size="small" component={Link} to={`/catalog/${product.id}`}>VIEW</Button>
            </CardActions>
        </Card>
    </>);
}