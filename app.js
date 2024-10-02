import { db } from './firebase.js';
import { collection, addDoc, getDocs, deleteDoc, doc, onSnapshot } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

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
  } catch (e) {
    console.error("Error al agregar la reserva: ", e);
  }
}

// Función para mostrar todas las reservas
function mostrarReservas() {
  const reservasList = document.getElementById('reservasList');
  reservasList.innerHTML = '';  // Limpiar la lista antes de actualizarla

  // Escuchar los cambios en tiempo real en la colección "reservas"
  onSnapshot(collection(db, "reservas"), (querySnapshot) => {
    reservasList.innerHTML = '';  // Vaciar la lista cada vez que se actualice
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
  });
}

// Función para eliminar una reserva
async function eliminarReserva(id) {
  try {
    await deleteDoc(doc(db, "reservas", id));
    console.log("Reserva eliminada:", id);
  } catch (e) {
    console.error("Error al eliminar la reserva: ", e);
  }
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
  document.getElementById('reservaForm').reset();  // Limpiar formulario
});

// Mostrar las reservas al cargar la página
window.onload = mostrarReservas;
