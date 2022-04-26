import { collection, doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { Product } from "../pages/Products/Products";
import { createListenerForCollection } from "./utils";

export async function saveProduct(productPayload: Product){
    const db = getFirestore();

    const docRef = doc(collection(db, "products"));
    
    return setDoc(docRef, productPayload)
}

export const listenForProducts = createListenerForCollection<Product>("products");
