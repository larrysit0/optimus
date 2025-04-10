// Función para activar la alarma, recibe el tipo de alarma (geolocalizacion o descripcion)
function activarAlarma(tipo) {
    let url = `/activar_alarma?tipo=${tipo}`;

    // Si el tipo es "descripcion", añadir la descripción a la URL
    if (tipo === 'descripcion') {
        const descripcion = document.getElementById("descripcion").value;
        url += `&descripcion=${descripcion}`;
    }

    // Realizamos la solicitud GET al backend
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Mostrar respuesta en la interfaz
            document.getElementById("respuesta").innerText = data.message;
        });
}

// Función para mostrar el campo de texto para descripción
function activarAlarmaConDescripcion() {
    document.getElementById("descripcion").style.display = "block";
    document.getElementById("enviarDescripcion").style.display = "block";
}
