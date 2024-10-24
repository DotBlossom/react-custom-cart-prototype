import { createContext, useContext, useState, useRef } from "react";
import axios from "axios";



export const CartContext = createContext(); 

export const useCartContext = () => useContext(CartContext);

export const CartProvider = ({children}) => {
    /*
    <Root - arrType> 
        
        
    <child : cartPage>

    */
    const [targets, setTargets] = useState([]);
    





    // fetch cart data




    return (
        <CartContext.Provider 
            value={{
                targets, 
                setTargets
            }}
        >
            {children}
        </CartContext.Provider>
    );


} 
