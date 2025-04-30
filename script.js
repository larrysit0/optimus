// Obtener elementos del DOM
const textarea = document.getElementById('descripcion');
const boton = document.getElementById('btnEmergencia');
const statusMsg = document.getElementById('statusMsg');
const toggleRealTime = document.getElementById('toggleRealTime');

// Lista de ubicaciones predefinidas
const ubicacionesPredeterminadas = [
  { nombre: 'Miembro 1', lat: -12.0464, lon: -77.0428, telefono: '+51960661434' },
  { nombre: 'Miembro 2', lat: -12.0564, lon: -77.0528, telefono: '+51960661435' },
  { nombre: 'Miembro 3', lat: -12.0664, lon: -77.0628, telefono: '+51960661436' }
];

// Selecciona una ubicación por defecto
let ubicacionSeleccionada = ubicacionesPredeterminadas[0];

// Detectar cambio en el botón de ubicación en tiempo real
toggleRealTime.addEventListener('change', () => {
  if (toggleRealTime.checked) {
    statusMsg.textContent = "ℹ️ Usando ubicación en tiempo real";
  } else {
    statusMsg.textContent = `ℹ️ Usando ubicación predeterminada de ${ubicacionSeleccionada.nombre}`;
  }
});

// Activar botón si el texto es válido
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

// Al hacer clic en el botón de alerta
boton.addEventListener('click', () => {
  const descripcion = textarea.value.trim();

  if (!navigator.geolocation && toggleRealTime.checked) {
    alert("Tu navegador no permite acceder a la ubicación.");
    return;
  }

  boton.disabled = true;
  boton.textContent = "Enviando...";
  statusMsg.textContent = "🔄 Enviando alerta...";

  let lat, lon;
  if (toggleRealTime.checked) {
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
    lat = ubicacionSeleccionada.lat;
    lon = ubicacionSeleccionada.lon;
    enviarAlerta(descripcion, lat, lon);
  }
});

// ⚠️ AJUSTA ESTA URL CON LA QUE TE DA NGROK
const API_URL = 'https://TU_SUBDOMINIO_NGROK.ngrok.io/api/alert'; // <-- Reemplázala por la que te muestra Ngrok

function enviarAlerta(descripcion, lat, lon) {
  fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      tipo: 'Alerta Roja Activada',
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
