// Ejemplo de funcionalidad interactiva
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.contact-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('¡Gracias por contactarnos!');
    form.reset();
  });
});
