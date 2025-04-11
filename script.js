document.addEventListener("DOMContentLoaded", function () {
    const descripcionGeo = document.getElementById("descripcionGeo");
    const botonGeo = document.getElementById("alarmaGeolocalizacion");

    const descripcionSolo = document.getElementById("descripcionSolo");
    const botonSolo = document.getElementById("alarmaDescripcion");

    descripcionGeo.addEventListener("input", function () {
        botonGeo.disabled = this.value.trim() === "";
    });

    descripcionSolo.addEventListener("input", function () {
        botonSolo.disabled = this.value.trim() === "";
    });
});

function activarAlarma(tipo) {
    let descripcion = "";

    if (tipo === "geolocalizacion") {
        descripcion = document.getElementById("descripcionGeo").value;
    } else if (tipo === "descripcion") {
        descripcion = document.getElementById("descripcionSolo").value;
    }

    const url = `/activar_alarma?tipo=${tipo}&descripcion=${encodeURIComponent(descripcion)}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            document.getElementById("respuesta").innerText = data.message;
        })
        .catch(error => {
            document.getElementById("respuesta").innerText = "Ocurrió un error al enviar la alarma.";
            console.error(error);
        });
}
