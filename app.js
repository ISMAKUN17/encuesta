import { db } from './firebase.js';
import { collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

// Función para agregar reservas
async function agregarReserva(nombre, room, fecha, hora, pax, notas) {
  try {
    await addDoc(collection(db, "reservas"), {
      nombre: nombre,
      room: room,
      fecha: fecha,
      hora: hora,
      pax: pax,
      notas: notas
    });
    console.log("Reserva agregada exitosamente");
    mostrarReservas();  // Refrescar la lista de reservas
  } catch (e) {
    console.error("Error al agregar la reserva: ", e);
  }
}

// Función para mostrar todas las reservas
async function mostrarReservas() {
  const reservasList = document.getElementById('reservasList');
  reservasList.innerHTML = '';  // Limpiar la lista antes de actualizarla

  const querySnapshot = await getDocs(collection(db, "reservas"));
  querySnapshot.forEach((doc) => {
    const reserva = doc.data();
    const reservaHTML = `
      <div class="reserva">
        <h3>Nombre: ${reserva.nombre}</h3>
        <p>Room: ${reserva.room}</p>
        <p>Fecha: ${reserva.fecha}</p>
        <p>Hora: ${reserva.hora}</p>
        <p>Pax: ${reserva.pax}</p>
        <p>Notas: ${reserva.notas}</p>
        <button onclick="eliminarReserva('${doc.id}')">Eliminar</button>
      </div>
    `;
    reservasList.innerHTML += reservaHTML;
  });
}

// Función para eliminar una reserva
async function eliminarReserva(id) {
  await deleteDoc(doc(db, "reservas", id));
  console.log("Reserva eliminada:", id);
  mostrarReservas();  // Refrescar la lista de reservas
}

// Agregar evento al formulario
document.getElementById('reservaForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const nombre = document.getElementById('nombre').value;
  const room = document.getElementById('room').value;
  const fecha = document.getElementById('fecha').value;
  const hora = document.getElementById('hora').value;
  const pax = document.getElementById('pax').value;
  const notas = document.getElementById('notas').value;

  agregarReserva(nombre, room, fecha, hora, pax, notas);
});

// Mostrar las reservas al cargar la página
window.onload = mostrarReservas;
