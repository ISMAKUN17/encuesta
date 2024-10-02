// Importar las funciones necesarias de Firebase
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

// Tu configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDUirwoSQgvcMZn7uLjKMAxlTA15Jkl2BM",
    authDomain: "ismakun-bf0fa.firebaseapp.com",
    projectId: "ismakun-bf0fa",
    storageBucket: "ismakun-bf0fa.appspot.com",
    messagingSenderId: "1028877703945",
    appId: "1:1028877703945:web:331de48acbcdf2234a51d8"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Referencia a la colección de reservas
const reservasRef = collection(db, "reservas");

// Función para agregar una reserva
document.getElementById("reservasForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const room = document.getElementById("room").value;
    const fecha = document.getElementById("fecha").value;
    const hora = document.getElementById("hora").value;
    const restaurante = document.getElementById("restaurante").value;
    const notas = document.getElementById("notas").value;

    try {
        // Agregar la reserva a Firestore
        await addDoc(reservasRef, {
            nombre: nombre,
            room: room,
            fecha: fecha,
            hora: hora,
            restaurante: restaurante,
            notas: notas
        });
        alert("Reserva agregada exitosamente!");

        // Limpiar el formulario
        document.getElementById("reservasForm").reset();

        // Actualizar la tabla de reservas
        mostrarReservas();
    } catch (error) {
        console.error("Error al agregar la reserva: ", error);
    }
});

// Función para mostrar las reservas
async function mostrarReservas() {
    const reservasTableBody = document.getElementById("tablaReservas").getElementsByTagName("tbody")[0];
    reservasTableBody.innerHTML = ""; // Limpiar la tabla antes de mostrar

    try {
        const querySnapshot = await getDocs(reservasRef);
        querySnapshot.forEach((doc) => {
            const reserva = doc.data();
            const row = reservasTableBody.insertRow();
            row.insertCell(0).textContent = reserva.nombre;
            row.insertCell(1).textContent = reserva.room;
            row.insertCell(2).textContent = reserva.fecha;
            row.insertCell(3).textContent = reserva.hora;
            row.insertCell(4).textContent = reserva.restaurante;
            row.insertCell(5).textContent = reserva.notas;
        });
    } catch (error) {
        console.error("Error al obtener las reservas: ", error);
    }
}

// Llamar a mostrarReservas al cargar la página
mostrarReservas();
