// Función para enviar la alarma al bot de Telegram
function enviarAlarma(conGeolocalizacion) {
    // Determinar qué mensaje se va a enviar
    let mensaje = conGeolocalizacion 
        ? document.getElementById("mensajeRojo").value 
        : document.getElementById("mensajeAzul").value;

    if (mensaje.trim() === "") {
        alert("Por favor, escribe un mensaje antes de enviar.");
        return;
    }

    // Crear el objeto de datos que se enviará al bot de Telegram
    let data = { 
        mensaje: mensaje, 
        geolocalizacion: conGeolocalizacion 
    };

    // Enviar los datos al bot usando fetch
    fetch("http://localhost:5000/enviarAlarma", {  // URL local del bot
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        alert("Alarma enviada correctamente.");
    })
    .catch(error => {
        alert("Error al enviar la alarma.");
        console.error("Error:", error);
    });
}
