import { initializeApp } from "firebase/app";
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, updateDoc } from 'firebase/firestore'
import { API_KEY } from "../../constansts/envValues";

export class Database {
    constructor(){
     const firebaseConfig = {
      apiKey: API_KEY,
      authDomain: "basedgigatodo-list.firebaseapp.com",
      projectId: "basedgigatodo-list",
      storageBucket: "basedgigatodo-list.appspot.com",
      messagingSenderId: "798512478078",
      appId: "1:798512478078:web:978ffc672bf6764b4a252f",
      measurementId: "G-L6N2K2XX8H"
    };
    const app = initializeApp(firebaseConfig);
    this._database = getFirestore(app)
    
    }
    
    create(collectionKey, body) {
      const collectionRef = collection(this._database, collectionKey);
      return addDoc(collectionRef, body)
    }
    
    read(collectionKey) {
      const collectionRef = collection(this._database, collectionKey);
      return getDocs(collectionRef)
      .then((documents)=>{
        return documents.docs.map((doc)=>({...doc.data(),id: doc.id}))
      })
    }
    
    update(collectionKey, id, body) {
      const document = doc(this._database, collectionKey, id);
      return updateDoc(document, body);
    }
    
    delete(collectionKey, id) {
      const document = doc(this._database, collectionKey, id);
      return deleteDoc(document);
    }
    
    
    static getInstance(){
    if (!Database.instance){
      Database.instance = new Database()
    }
    return Database.instance
    }
}