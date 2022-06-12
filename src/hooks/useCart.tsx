import React from "react";
import { Product } from "../pages/Products/Products";
import { updateUser,getUserByUid } from "../services/users";
import { AuthContext } from "./useAuth";
export type CartProduct = Product & {
    count: number;
}


export const CartContext = React.createContext<ReturnType<typeof useCart>>(null!);

const localStorageCartKey = "CART";

export function useCart(){
    const [cart,setCart] = React.useState<CartProduct[]>(() => {
        const cart = localStorage.getItem(localStorageCartKey);
        if (cart) {
            return JSON.parse(cart);
        }
        return []
    });
    const {user,userInfo} = React.useContext(AuthContext);
    function emptyCart(){
        setCart([]);
    }

    function addToCart(product:Product){
        const index = cart.findIndex(el => el.id === product.id);
        if(index !== -1){ // avem produs, adauga la count
            const newCart = cart.map((cart, i) => i === index ? { ...cart, count: cart.count + 1 } : cart);
            setCart(newCart);
        }else { // add product to cart
            setCart([...cart,{...product, count:1}])
        }
    }
    React.useEffect(() => {
        (async () => {
            console.log("setting cart");
            if(userInfo){
                const userCart = userInfo.cart;
                if(userCart){
                    setCart(userCart);
                }else {
                    setCart([]);
                }
            }
        })()
    },[userInfo]);
    React.useEffect(() => {
        localStorage.setItem(localStorageCartKey, JSON.stringify(cart));
        if (user) {
            updateUser(user.uid, {cart});
        }
    },[cart]);
    function remove(product: Product) {
        const index = cart.findIndex(el => el.id === product.id);
        if (index !== -1) {
            const newCart = cart.map((cart, i) => i === index ? { ...cart, count: cart.count - 1 } : cart);
            setCart(newCart);
        } else {
            return;
        }
    }
    function deleteFromCart(product: Product) {
        const newCart = cart.filter(o => o !== product)
        setCart(newCart);
    }

    return {
        cart,
        addToCart,
        emptyCart,
        remove,
        deleteFromCart
    }
}

export const CartContextProvider: React.FC = ({ children }) => {
    const cart = useCart();
    return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
  };
  
