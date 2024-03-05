import { Link } from "react-router-dom";
import { Product } from "../../app/models/product";
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import ProductDetail from "./ProductDetail";


interface Props {
    product: Product,
    index: number
}

export default function ProductCard({ product, index }: Props) {
    return (<>
        <Card>
            <CardHeader
                avatar={
                    <Avatar sx={{bgcolor: 'secondary.main'}}>
                        {product.name.charAt(0).toUpperCase()}

                    </Avatar>

                }
                title={product.name}
                titleTypographyProps={{
                    sx:{fontWeight: 'bold', color: 'primary.main'}
                }}
                >
            </CardHeader>
            <CardMedia
                sx={{ height: 140, backgroundSize: 'contain', bgcolor:'primary.light' }}
                image={product.pictureUrl}
                title={product.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" color='secondary' component="div">
                    ${(product.price/100).toFixed(2)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.brand} / {product.type}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Add to Card</Button>
                <Button size="small" component={Link} to={`/catalog/${product.id}`}>VIEW</Button>
            </CardActions>
        </Card>
    </>);
}