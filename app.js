import { db } from './firebase.js';
import { collection, query, orderBy, getDocs } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

// Función para mostrar reservas en la tabla, ordenadas
async function consultarReservas(criterioOrden = 'fecha') {
  const tablaBody = document.querySelector('#tablaReservas tbody');
  tablaBody.innerHTML = ''; // Limpiar la tabla antes de llenarla nuevamente

  const q = query(collection(db, "reservas"), orderBy(criterioOrden));
  
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const reserva = doc.data();
    const filaHTML = `
      <tr>
        <td>${reserva.fecha}</td>
        <td>${reserva.room}</td>
        <td>${reserva.restaurante}</td>
        <td>${reserva.hora}</td>
        <td>${reserva.nombre}</td>
        <td>${reserva.pax}</td>
        <td>${reserva.notas}</td>
      </tr>
    `;
    tablaBody.innerHTML += filaHTML;
  });
}

// Función para ordenar las reservas por criterio seleccionado
function ordenarPor(criterio) {
  consultarReservas(criterio); // Recargar la tabla con el nuevo criterio de orden
}

// Mostrar reservas ordenadas por fecha al cargar la página
window.onload = function() {
  consultarReservas('fecha');
};
