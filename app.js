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

// Limites de pax por restaurante
const limitePax = {
    "Himitsu": 8,
    "El Patio": 8,
    "Bluewater Grill": 8,
    "Olio": 8,
    "Bordeaux": 8,
    "Hibachi": 10
};

// Almacenamos el total de pax por cada horario
const reservasPorHorario = {};

// Seleccionamos los elementos del restaurante y hora
const restauranteSelect = document.getElementById('restaurante');
const horaSelect = document.getElementById('hora');

// Función para actualizar los horarios según el restaurante seleccionado
restauranteSelect.addEventListener('change', function() {
    const restauranteSeleccionado = this.value;
    console.log("Restaurante seleccionado:", restauranteSeleccionado);

    // Limpiamos los horarios previos
    horaSelect.innerHTML = '<option value="">Seleccione un horario</option>';

    // Verificamos si hay horarios disponibles para el restaurante seleccionado
    if (horariosRestaurantes[restauranteSeleccionado]) {
        const horarios = horariosRestaurantes[restauranteSeleccionado];
        console.log("Horarios disponibles:", horarios);

        // Agregamos los horarios a la lista desplegable
        horarios.forEach(function(horario) {
            const option = document.createElement('option');
            option.value = horario;
            option.textContent = horario;
            horaSelect.appendChild(option);
        });
    } else {
        console.log("No hay horarios disponibles para este restaurante.");
    }
});

// Enviamos el formulario
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Evitamos el envío del formulario

    const fecha = document.getElementById('fecha').value;
    const room = document.getElementById('room').value;
    const huesped = document.getElementById('huesped').value;
    const restaurante = restauranteSelect.value;
    const hora = horaSelect.value;
    const pax = document.getElementById('pax').value;
    const notas = document.getElementById('notas').value;

    // Validamos el límite de pax
    if (parseInt(pax) > limitePax[restaurante]) {
        alert(`El límite de pax para ${restaurante} es ${limitePax[restaurante]}.`);
        return;
    }

    // Agregamos la reserva a la tabla
    const newRow = reservasTable.insertRow();
    newRow.innerHTML = `
        <td>${fecha}</td>
        <td>${room}</td>
        <td>${huesped}</td>
        <td>${restaurante}</td>
        <td>${hora}</td>
        <td>${pax}</td>
        <td>${notas}</td>
    `;

    // Guardamos en Firebase
    guardarReservaEnFirebase({ fecha, room, huesped, restaurante, hora, pax, notas });

    // Reiniciamos el formulario
    form.reset();
    horaSelect.innerHTML = '<option value="">Seleccione un horario</option>'; // Limpiamos los horarios
});

// Función para guardar la reserva en Firebase
function guardarReservaEnFirebase(reserva) {
    const db = firebase.database();
    const reservasRef = db.ref('reservas'); // Cambia 'reservas' por tu ruta deseada

    reservasRef.push(reserva)
        .then(() => {
            console.log('Reserva guardada exitosamente en Firebase:', reserva);
        })
        .catch((error) => {
            console.error('Error guardando la reserva en Firebase:', error);
        });
}
