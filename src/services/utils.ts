import { collection, getFirestore, onSnapshot, query } from "firebase/firestore";

export const createListenerForCollection = <T extends object = any>(collectionName:string) => (cb:(data:T[]) => void) => {
    
    const db = getFirestore();
    const q =  query(collection(db,collectionName))
    
    return onSnapshot(q, querySnapshot => {
        const data = querySnapshot.docs.map(doc => doc.data()) as T[]
        cb(data);
    })
}