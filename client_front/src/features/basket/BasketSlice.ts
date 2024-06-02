import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Basket } from "../../app/models/basket";
import agent from "../../app/api/agent";

interface BasketState{
    basket: Basket | null,
    status: string;
}

const initialState: BasketState = {
    basket: null,
    status: 'idle'
}

export const addBasketItemAsync = createAsyncThunk<Basket, {productId: number, qty?: number}>( 
    'basket_addBasketItemAsync',
    async ({productId, qty = 1}) => {
        try {
            return await agent.Basket.addItem(productId, qty)
        } catch (error) {
            console.log(error);
        }
    }
)
export const removeBasketItemAsync = createAsyncThunk<Basket, 
{productId: number, qty: number, name?: string}>( 
    'basket_removeBasketItemAsync',
    async ({productId, qty}) => {
        try {
              await agent.Basket.removeItem(productId, qty) 
              return await agent.Basket.get()
        } catch (error) { 
            console.log(error);
        }
    }
)

export const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        setBasket: (state, action) => { 
            state.basket = action.payload
        } 
    },
    extraReducers: (builder => {
        builder.addCase(addBasketItemAsync.pending, (state, action) => {
            console.log(action)
            state.status = 'pendingAddItem' + action.meta.arg.productId;
        });
        builder.addCase(addBasketItemAsync.fulfilled, (state, action) => {
            state.basket = action.payload;
            state.status = 'idle';
        });
        builder.addCase(addBasketItemAsync.rejected, (state, action) => { 
            state.status = 'idle';
        });

        // add remove
        builder.addCase(removeBasketItemAsync.pending, (state, action) => {
         
            state.status = 'pendingRemoveItem' + action.meta.arg.productId + action.meta.arg.name;
        });
        builder.addCase(removeBasketItemAsync.fulfilled, (state, action) => {
            /*
                render shopping cart
            */
            const {productId, qty} = action.meta.arg;
            const itemIndex = state.basket?.items.findIndex(i=>i.productId === productId);
            if(itemIndex === -1 || itemIndex === undefined) return;
            state.basket!.items[itemIndex].quantity -= qty;
            if(state.basket?.items[itemIndex].quantity === 0){

                state.basket.items.splice(itemIndex, 1)
            }  

            state.status= 'idle';
            // state.basket = action.payload;
            // state.status = 'idle';
        });
        builder.addCase(removeBasketItemAsync.rejected, (state, action) => { 
            state.status = 'idle';
        });
    })
})

export const {setBasket} = basketSlice.actions;