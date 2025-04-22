// Obtener elementos del DOM
const textarea = document.getElementById('descripcion');
const boton = document.getElementById('btnEmergencia');
const statusMsg = document.getElementById('statusMsg');
const toggleRealTime = document.getElementById('toggleRealTime');

// Ubicaciones predeterminadas de los miembros del grupo
// Cada objeto contiene el nombre del miembro y sus coordenadas de ubicación
const ubicacionesPredeterminadas = [
  { nombre: 'Miembro 1', lat: -12.0464, lon: -77.0428, telefono: '+51960661434' }, // Miembro 1
  { nombre: 'Miembro 2', lat: -12.0564, lon: -77.0528, telefono: '+51960661435' }, // Miembro 2
  { nombre: 'Miembro 3', lat: -12.0664, lon: -77.0628, telefono: '+51960661436' }  // Miembro 3
];

// Inicialmente, seleccionamos la ubicación del Miembro 1
let ubicacionSeleccionada = ubicacionesPredeterminadas[0];

// Actualiza la ubicación seleccionada cuando se desliza el botón
toggleRealTime.addEventListener('change', () => {
  if (toggleRealTime.checked) {
    statusMsg.textContent = "ℹ️ Usando ubicación en tiempo real";
  } else {
    statusMsg.textContent = `ℹ️ Usando ubicación predeterminada de ${ubicacionSeleccionada.nombre}`;
  }
});

// Habilitar o deshabilitar el botón de alerta según el contenido del textarea
textarea.addEventListener('input', () => {
  const texto = textarea.value.trim();
  if (texto.length >= 4 && texto.length <= 300) {
    boton.disabled = false;
    boton.classList.add('enabled');
    statusMsg.textContent = "✅ Listo para enviar";
  } else {
    boton.disabled = true;
    boton.classList.remove('enabled');
    statusMsg.textContent = "⏳ Esperando acción del usuario...";
  }
});

// Manejar el evento de clic en el botón de alerta
boton.addEventListener('click', () => {
  const descripcion = textarea.value.trim();

  if (!navigator.geolocation && !toggleRealTime.checked) {
    alert("Tu navegador no permite acceder a la ubicación.");
    return;
  }

  boton.disabled = true;
  boton.textContent = "Enviando...";
  statusMsg.textContent = "🔄 Enviando alerta...";

  let lat, lon;
  if (toggleRealTime.checked) {
    // Usar ubicación en tiempo real
    navigator.geolocation.getCurrentPosition(position => {
      lat = position.coords.latitude;
      lon = position.coords.longitude;
      enviarAlerta(descripcion, lat, lon);
    }, error => {
      alert("No se pudo obtener la ubicación: " + error.message);
      boton.disabled = false;
      boton.textContent = "Enviar Alerta Roja";
      statusMsg.textContent = "⚠️ No se pudo obtener ubicación.";
    });
  } else {
    // Usar ubicación predeterminada
    lat = ubicacionSeleccionada.lat;
    lon = ubicacionSeleccionada.lon;
    enviarAlerta(descripcion, lat, lon);
  }
});

// Función para enviar la alerta
function enviarAlerta(descripcion, lat, lon) {
  fetch('/api/alert', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      tipo: 'alerta_roja',
      descripcion,
      ubicacion: {
        latitud: lat,
        longitud: lon
      }
    })
  })
  .then(response => response.json())
  .then(data => {
    alert('✅ Alerta enviada con ubicación');
    textarea.value = '';
    boton.disabled = true;
    boton.classList.remove('enabled');
    boton.textContent = "Enviar Alerta Roja";
    statusMsg.textContent = "✅ Alerta enviada correctamente";
  })
  .catch(error => {
    alert('❌ Error al enviar la alerta');
    console.error(error);
    boton.disabled = false;
    boton.textContent = "Enviar Alerta Roja";
    statusMsg.textContent = "❌ Hubo un error al enviar la alerta.";
  });
}

// Ejemplo de cómo agregar más miembros
// Para agregar un nuevo miembro, simplemente agrega un nuevo objeto al array `ubicacionesPredeterminadas`
// Ejemplo:
/*
const nuevoMiembro = {
  nombre: 'Miembro 4',
  lat: -12.0764,
  lon: -77.0728,
  telefono: '+51960661437'
};
ubicacionesPredeterminadas.push(nuevoMiembro);
*/
