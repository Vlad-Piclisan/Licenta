import { getDocs, getFirestore, collection } from "firebase/firestore";

export type Config = {
    url: string;
    name: string
}

export async function getAllConfigs(): Promise<Config[]> {
    const db = getFirestore();
    const querySnapshot = await getDocs(collection(db, "configurations"));
    const configs = querySnapshot.docs.map(doc => doc.data())
    return configs as Config[];
}

