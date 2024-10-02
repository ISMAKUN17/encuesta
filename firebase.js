// Importa las funciones necesarias del SDK de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDUirwoSQgvcMZn7uLjKMAxlTA15Jkl2BM",
  authDomain: "ismakun-bf0fa.firebaseapp.com",
  databaseURL: "https://ismakun-bf0fa-default-rtdb.firebaseio.com",
  projectId: "ismakun-bf0fa",
  storageBucket: "ismakun-bf0fa.appspot.com",
  messagingSenderId: "1028877703945",
  appId: "1:1028877703945:web:331de48acbcdf2234a51d8"
};

// Inicializa Firebase y Firestore
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
