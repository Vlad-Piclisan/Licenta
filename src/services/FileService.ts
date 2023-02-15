import { getStorage, ref, uploadBytes, getDownloadURL, } from "firebase/storage";

export async function createFileURL(file:File){
    
    const storage = getStorage();
    const filePath = `products/${file.name}`;
    console.log({filePath});
    const storageRef = ref(storage,filePath);

    const snapshot = await uploadBytes(storageRef, file);
    
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
}
