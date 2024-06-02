import { PropsWithChildren, createContext, useContext, useState } from "react";
import { Basket } from "../models/basket";

interface StoreContextValue {
    basket: Basket | null;
    basketChanged: boolean;
    setBasket: (basket: Basket) => void;
    setBasketChanged: (basketChanged: boolean) => void;
    removeItem: (productId: number, quantity: number) => void;

}
export const StoreContext = createContext<StoreContextValue | undefined>(undefined);

export function useStoreContext() {
    // useContext react hook
    const context = useContext(StoreContext);
    if (context === undefined) {
        throw Error('Oops we do not seem to be inside the provider');

    }
    return context;
}

export function StoreProvider({ children }: PropsWithChildren<any>) {
    const [basket, setBasket] = useState<Basket | null>(null);
    const [basketChanged, setBasketChanged] = useState(false);
    function removeItem(productId: number, quantity: number) {
        if (!basket) return;
        const items = [...basket.items];
        const itemIndex = items.findIndex(i => i.productId === productId);
        if(itemIndex >= 0){
            items[itemIndex].quantity -= quantity;
            if(items[itemIndex].quantity === 0) items.splice(itemIndex, 1);
            setBasket(prevState => {
                setBasketChanged(true);
                return {...prevState!, items} 
            })
            setBasketChanged(false);
        } 
    }
    
    return (
        <StoreContext.Provider value={{basket, basketChanged, setBasket, setBasketChanged, removeItem}}>
            {children}
        </StoreContext.Provider>
    )

}