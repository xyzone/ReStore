import { Paper, Tab, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
 
import { displayDollar } from "../../app/util/util";
import { useAppSelector } from "../../app/store/configureStore";

export default function BasketSummary(){
    const {basket} = useAppSelector(state => state.basket);
    const subtotal = basket?.items.reduce((total, item) => total + item.price * item.quantity, 0) ?? 0;
    const deliveryFee = subtotal > 10000 ? 0 : 5;
    return (
    <>
    <TableContainer component={Paper} variant={'outlined'}>
        <Table>
            <TableBody>
                <TableRow>
                    <TableCell colSpan={2}> Subtotal

                    </TableCell>
                    <TableCell>
                        {displayDollar(subtotal)} 
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell colSpan={2}> Delivery Fee

                    </TableCell>
                    <TableCell>
                        {displayDollar(deliveryFee)}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell colSpan={2}> Total

                    </TableCell>
                    <TableCell>
                       {displayDollar(subtotal + deliveryFee)}
                     
                    </TableCell>
                </TableRow>
            </TableBody>

        </Table>

    </TableContainer>
    </>
    )
    
}
 