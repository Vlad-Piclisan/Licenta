import { collection, deleteDoc, doc, getDoc, getDocs, getFirestore, query, setDoc,onSnapshot } from "firebase/firestore";
import { SignUpPayload, UserInfo } from "../models/Users";

export async function saveCategory(categoryName:string){
    const db = getFirestore();
    const docRef = doc(db, `categories/${categoryName}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      throw new Error("Document already exists");
    }
    return setDoc(doc(db, `categories/${categoryName}`), {
        name:categoryName
    })
}

export function listenForCategories(cb:(categories?:any) => void){
    
    const db = getFirestore();
    const q = query(collection(db,"categories"))
    const meche =collection(db,"categories");
    
    return onSnapshot(q, querySnapshot => {
        const categories = querySnapshot.docs.map(doc => doc.data())
        cb(categories);
    })
}

export async function getAllCategories(){
    const db = getFirestore();
    const querySnapshot = await getDocs(collection(db, "categories"));
    const categories = querySnapshot.docs.map(doc => doc.data())
    return categories;
}

export async function getCategoryByName(categoryName:string){
    const db = getFirestore();
    const docRef = doc(db, `categories/${categoryName}`);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new Error("Document does not exist");
    }
    return docSnap.data();
}

export async function deleteCategory(categoryName:string){
    const db = getFirestore();
    return  deleteDoc(doc(db, `categories/${categoryName}`));
}