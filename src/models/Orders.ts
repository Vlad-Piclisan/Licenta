import { CartProduct } from "../hooks/useCart";

export interface Orders {
    products: CartProduct[],
    address: string,
    cardInformation: {
        cardName: string,
        cardNumber: string,
        expDate: string,
        cvv: string,
    }
}