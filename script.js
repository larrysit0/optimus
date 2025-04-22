const textarea = document.getElementById('descripcion');
const boton = document.getElementById('btnEmergencia');
const statusMsg = document.getElementById('statusMsg');
const toggleRealTime = document.getElementById('toggleRealTime');

// Ubicaciones predeterminadas de los miembros del grupo
const ubicacionesPredeterminadas = [
  { nombre: 'Miembro 1', lat: -12.0464, lon: -77.0428 },
  { nombre: 'Miembro 2', lat: -12.0564, lon: -77.0528 },
  // Agrega más miembros aquí
];

let ubicacionSeleccionada = ubicacionesPredeterminadas[0]; // Predeterminada

// Actualiza la ubicación seleccionada cuando se desliza el botón
toggleRealTime.addEventListener('change', () => {
  if (toggleRealTime.checked) {
    statusMsg.textContent = "ℹ️ Usando ubicación en tiempo real";
  } else {
    statusMsg.textContent = `ℹ️ Usando ubicación predeterminada de ${ubicacionSeleccionada.nombre}`;
  }
});

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
