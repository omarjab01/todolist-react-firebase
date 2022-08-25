import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from '@firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyDQC5SLjMsxHz0i45jrdJKyZei8OW1flvU",
  authDomain: "todo-react-2-62249.firebaseapp.com",
  projectId: "todo-react-2-62249",
  storageBucket: "todo-react-2-62249.appspot.com",
  messagingSenderId: "923967783623",
  appId: "1:923967783623:web:b08cfd70aeaf0f18cbf4e2"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

export const db = getFirestore(app)