function activarAlarma(tipo) {
    let descripcion = '';

    if (tipo === 'geolocalizacion') {
        descripcion = document.getElementById("descripcionGeo").value;
    } else if (tipo === 'descripcion') {
        descripcion = document.getElementById("descripcionSolo").value;
    }

    let url = `/activar_alarma?tipo=${tipo}&descripcion=${encodeURIComponent(descripcion)}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            document.getElementById("respuesta").innerText = data.message;
        });
}

// Habilita los botones si hay texto en su respectiva caja
document.getElementById("descripcionGeo").addEventListener("input", function () {
    document.getElementById("alarmaGeolocalizacion").disabled = this.value.trim() === "";
});

document.getElementById("descripcionSolo").addEventListener("input", function () {
    document.getElementById("alarmaDescripcion").disabled = this.value.trim() === "";
});
