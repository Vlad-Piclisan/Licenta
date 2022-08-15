import { doc, getFirestore, setDoc,collection } from "firebase/firestore";
import { Orders } from "../models/Orders";

export async function saveOrder(order: Orders) {
    const db = getFirestore();

    const docRef = doc(collection(db, "orders"))

    return setDoc(docRef, order)
}