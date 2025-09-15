// js/registro-form.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registration-form');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');

    form.addEventListener('submit', event => {
        // Prevenir el envío del formulario por defecto
        event.preventDefault();
        event.stopPropagation();

        let isValid = true;

        // Validar confirmación de contraseña
        if (password.value !== confirmPassword.value) {
            confirmPassword.classList.add('is-invalid');
            confirmPassword.classList.remove('is-valid');
            isValid = false;
        } else if (confirmPassword.value) {
            confirmPassword.classList.remove('is-invalid');
            confirmPassword.classList.add('is-valid');
        } else {
            confirmPassword.classList.add('is-invalid');
            confirmPassword.classList.remove('is-valid');
        }

        // Aplicar las clases de validación de Bootstrap al resto del formulario
        if (!form.checkValidity()) {
            isValid = false;
        }

        form.classList.add('was-validated');

        if (isValid) {
            console.log('Formulario válido, redirigiendo al inicio.');
            
            // LÍNEA MODIFICADA: En lugar de una alerta, te lleva a index.html
            window.location.href = 'index.html'; 
        }
    });
});