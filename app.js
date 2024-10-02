// Capturamos el formulario y la tabla
const form = document.getElementById('reservaForm');
const reservasTable = document.getElementById('reservasTable').getElementsByTagName('tbody')[0];

// Opciones de horarios por restaurante
const horariosRestaurantes = {
    "Himitsu": ["6:00 PM", "7:30 PM", "8:30 PM", "9:45 PM"],
    "El Patio": ["6:00 PM", "7:30 PM", "8:30 PM", "9:45 PM"],
    "Bluewater Grill": ["6:00 PM", "7:30 PM", "8:30 PM", "9:45 PM"],
    "Olio": ["6:00 PM", "7:30 PM", "8:30 PM", "9:45 PM"],
    "Bordeaux": ["6:00 PM", "7:30 PM", "8:30 PM", "9:45 PM"],
    "Hibachi": ["6:00 PM", "7:15 PM", "8:30 PM", "9:45 PM"]
};

// Seleccionamos los elementos del restaurante y hora
const restauranteSelect = document.getElementById('restaurante');
const horaSelect = document.getElementById('hora');

// Función para actualizar los horarios según el restaurante seleccionado
restauranteSelect.addEventListener('change', function() {
    const restauranteSeleccionado = this.value;

    // Limpiamos los horarios previos
    horaSelect.innerHTML = '<option value="">Seleccione un horario</option>';

    // Verificamos si hay horarios disponibles para el restaurante seleccionado
    if (horariosRestaurantes[restauranteSeleccionado]) {
        const horarios = horariosRestaurantes[restauranteSeleccionado];

        // Agregamos los horarios a la lista desplegable
        horarios.forEach(function(horario) {
            const option = document.createElement('option');
            option.value = horario;
            option.textContent = horario;
            horaSelect.appendChild(option);
        });
    }
});

// Manejamos el envío del formulario
form.addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevenir el envío del formulario

    // Capturamos los valores de los campos
    const fecha = document.getElementById('fecha').value;
    const room = document.getElementById('room').value;
    const huesped = document.getElementById('huesped').value;
    const restaurante = restauranteSelect.value;
    const hora = horaSelect.value;
    const pax = parseInt(document.getElementById('pax').value);
    const notas = document.getElementById('notas').value;

    // Crea el objeto de reserva
    const reserva = {
        fecha,
        room,
        huesped,
        restaurante,
        hora,
        pax,
        notas
    };

    // Envío de datos a Firestore
    try {
        const docRef = await addDoc(collection(db, "reservas"), reserva);
        console.log("Reserva guardada con ID: ", docRef.id);
        form.reset();
        horaSelect.innerHTML = '<option value="">Seleccione un horario</option>'; // Reiniciar horarios
        // Actualizar tabla de reservas
        const row = reservasTable.insertRow();
        row.insertCell(0).textContent = fecha;
        row.insertCell(1).textContent = room;
        row.insertCell(2).textContent = huesped;
        row.insertCell(3).textContent = restaurante;
        row.insertCell(4).textContent = hora;
        row.insertCell(5).textContent = pax;
        row.insertCell(6).textContent = notas;
    } catch (e) {
        console.error("Error al guardar la reserva: ", e);
    }
});

// Función para consultar las reservas desde Firestore
async function consultarReservas() {
    const querySnapshot = await getDocs(collection(db, "reservas"));
    querySnapshot.forEach((doc) => {
        const reserva = doc.data();
        const row = reservasTable.insertRow();
        row.insertCell(0).textContent = reserva.fecha;
        row.insertCell(1).textContent = reserva.room;
        row.insertCell(2).textContent = reserva.huesped;
        row.insertCell(3).textContent = reserva.restaurante;
        row.insertCell(4).textContent = reserva.hora;
        row.insertCell(5).textContent = reserva.pax;
        row.insertCell(6).textContent = reserva.notas;
    });
}

// Consultar reservas al cargar la página
window.onload = consultarReservas;
