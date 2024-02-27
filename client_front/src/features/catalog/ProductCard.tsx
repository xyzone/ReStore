import { Product } from "../../app/models/product";
import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@mui/material";


interface Props {
    product: Product,
    index: number
}

export default function ProductCard({ product, index }: Props) {
    return (<>
        <ListItem key={index}>
            <ListItemAvatar>
                <Avatar src={product.pictureUrl}></Avatar>
            </ListItemAvatar>
            <ListItemText> {index}.{product.name} - {product.price}</ListItemText>
        </ListItem>
    </>);
}