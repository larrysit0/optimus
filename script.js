// 🔴 Reemplaza con tu TOKEN del bot de Telegram (creado en BotFather)
const BOT_TOKEN = "7595614107:AAE2hsgX3Ce4FhMbO3Kshzu60TfInb9Al8c"; 

// 🔵 Reemplaza con el ID de tu grupo o chat en Telegram
const CHAT_ID = "-1002210223048"; 

// ✅ Función para enviar mensajes a Telegram
function enviarMensaje(mensaje) {
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodeURIComponent(mensaje)}`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => console.log("Mensaje enviado:", data))
        .catch(error => console.error("Error al enviar mensaje:", error));
}

// 🎯 Evento para el botón rojo (Alerta máxima)
document.getElementById("botonRojo").addEventListener("click", function() {
    enviarMensaje("🚨 *ALERTA MÁXIMA* 🚨\nSe ha presionado el Botón Rojo.");
});

// 🎯 Evento para el botón azul (Aviso informativo)
document.getElementById("botonAzul").addEventListener("click", function() {
    enviarMensaje("🔵 *Aviso Informativo* 🔵\nSe ha presionado el Botón Azul.");
});
