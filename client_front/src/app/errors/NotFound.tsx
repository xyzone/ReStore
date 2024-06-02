import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function NotFound(){
    return(
        <Container component={Paper} sx={{height: 400}}>
            <Typography gutterBottom variant="h3">Oops - Not found</Typography>
            <Divider> 
            </Divider>
            <Button fullWidth component={Link} to='/catalog'>Go Back to Shop</Button>
        </Container>
    )
}