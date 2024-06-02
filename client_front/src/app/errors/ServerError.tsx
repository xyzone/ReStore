import { Container, Divider, Paper, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

export default function ServerError(){
    const {state} = useLocation();
    
    return(
        <Container component={Paper}>
            {state?.error1? (
                <>
                    <Typography gutterBottom variant="h3" color="secondary">
                        {state.error1.title}
                    </Typography>
                    <Divider></Divider>
                    <Typography variant="body1">
                        {state.error1.detail || 'Internal server Error'}
                    </Typography>
                </>
            ): (
                <Typography variant="h5" gutterBottom> Server Error</Typography>
            )}
           
        </Container>
    )
}