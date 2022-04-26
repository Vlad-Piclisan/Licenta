import { collection, doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { Product } from "../pages/Products/Products";

export async function saveProduct(productPayload: Product){
    const db = getFirestore();

    const docRef = doc(collection(db, "products"));
    
    return setDoc(docRef, productPayload)
}
