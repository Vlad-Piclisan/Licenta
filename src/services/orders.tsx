
import { doc, getFirestore, setDoc, collection, getDocs, where, query } from "firebase/firestore";
import { Orders } from "../models/Orders";

export async function saveOrder(order: Orders) {
    const db = getFirestore();

    const docRef = doc(collection(db, "orders"))

    return setDoc(docRef, order)
}

export async function getAllOrders(): Promise<Orders[]> {
    const db = getFirestore();
    const querySnapshot = await getDocs(collection(db, "orders"));
    const orders = querySnapshot.docs.map(doc => doc.data())
    return orders as Orders[];
}

export async function getOrdersByUserID(userID: string): Promise<Orders[]> {
    const db = getFirestore();
    const ordersRef = collection(db, "orders")
    const q = query(ordersRef, where("userID", "==", userID));
    const querySnapshot = await getDocs(q);
    const orders = querySnapshot.docs.map(doc => doc.data())
    return orders as Orders[];
}