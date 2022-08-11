import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { SignUpPayload, UserInfo } from "../models/Users";

export function saveUserToDatabase(uid: string, payload: any) {
  const db = getFirestore();
  const requiredKeys = ["email", "firstName", "lastName"];
  const obj = Object.fromEntries(requiredKeys.map((key) => [key, payload[key]]));
  return setDoc(doc(db, `users/${uid}`), obj);
}

export async function getUserByUid(uid: string): Promise<UserInfo | null> {
  const db = getFirestore();
  const docRef = doc(db, `users/${uid}`);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data() as UserInfo;
  }
  return null;
}

export async function updateUser(uid:string,payload:Partial<UserInfo>){
  const db = getFirestore();
  return setDoc(doc(db, `users/${uid}`), payload, { merge:true });
}

